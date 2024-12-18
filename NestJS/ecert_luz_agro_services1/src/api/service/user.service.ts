import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { User } from "../entity/user.entity";
import { RolDto } from "../dto/Rol.dto";
import { Rol } from "../entity/rol.entity";
import { UserRequestDto } from "../dto/models.dto";
import { UserDto } from "../dto/User.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repository: Repository<User>) { }

    /*async getAll(): Promise<GenericResponse> {
        
    }*/

    async new(reqNew: UserRequestDto): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: User = new User();
        try {
            const {
                ctaUserName, ctaPassWord, ctaEmail
            } = reqNew;
            try {
                let toNew: User = await this.repository.findOneBy({
                    ctaUserName
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Usuario ya existe';
                    return resp;
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return resp;
            }

            try {
                const newElement = Object.assign(new User(), {
                    ctaUserName, ctaPassWord, ctaEmail, estado: true
                });
                newElement.hashPassword();
                dataResponse = await this.repository.save(newElement);
                resp.data = dataResponse.id;
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async edit(reqEdit: UserRequestDto, id: number): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: User = new User();
        let elementToEdit: User = new User();
        try {
            // const id = parseInt(request.params.id);
            elementToEdit = await this.repository.findOneBy({ id });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new User();
                console.log('Usuarios no existe');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            elementToEdit = this.getObjectEdit(reqEdit, elementToEdit);
            dataResponse = await this.repository.save(elementToEdit);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async delete(id: number): Promise<GenericResponse> {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let userToRemove: User = new User();
        try {
            //const id = parseInt(request.params.id);
            userToRemove = await this.repository.findOneBy({ id });
            if (!userToRemove) {
                resp.code = '1';
                resp.data = new User();
                resp.message = StatusCode.ERROR + ': Usuario no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Usuario';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: User = await this.repository.remove(userToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(reqFindByFilter: UserRequestDto): Promise<GenericResponse> {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { ctaUserName, ctaEmail, limit, pageSize } = reqFindByFilter;
        try {
            const [resultsReg, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        ctaUserName: ctaUserName ? Like('%' + ctaUserName + '%') : null,
                        ctaEmail: ctaEmail ? Like('%' + ctaEmail + '%') : null,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: (pageSize - 1) * limit,
                    relations: { roles: true }
                }
            );
            let results: UserDto[] = this.convertToVOs(resultsReg);
            resp.data = {
                totalReg,
                nextPage: pageSize + 1,
                previousPage: pageSize,
                results,
            };
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    private convertToVOs(inputUser: User[]): UserDto[] {
        let salidaUser: UserDto[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: User): UserDto {
        let itemUser: UserDto = new UserDto();
        itemUser = new UserDto();
        itemUser.id = inputUser.id;
        itemUser.ctaUserName = inputUser.ctaUserName;
        //itemUser.ctaPassWord = inputUser.ctaPassWord;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        let rols: RolDto[] = this.convertToRolVOs(inputUser.roles);
        itemUser.roles = [];
        itemUser.roles.push(...rols);
        return itemUser;
    }

    private convertToRolVOs(input: Rol[]): RolDto[] {
        let salida: RolDto[] = [];
        if (input) {
            for (let index = 0; index < input.length; index++) {
                salida.push(this.convertToRolVO(input[index]));
            }
        }
        return salida;
    }

    private convertToRolVO(input: Rol): RolDto {
        let item: RolDto = new RolDto();
        item = new RolDto();
        item.id = input.id;
        item.name = input.name;
        item.descrip = input.descrip;
        item.code = input.code;
        item.estado = input.estado;
        return item;
    }

    private getObjectEdit(request: UserRequestDto, elementToEdit: User): User{
        const { ctaUserName, ctaPassWord, ctaEmail, estado } = request;
        if (typeof ctaUserName !== 'undefined' && ctaUserName !== null && ctaUserName !== '') {
            console.log('ctaUserName: [' + ctaUserName + ']');
            elementToEdit.ctaUserName = ctaUserName;
        }
        if (typeof ctaEmail !== 'undefined' && ctaEmail !== null && ctaEmail !== '') {
            console.log('ctaEmail: [' + ctaEmail + ']');
            elementToEdit.ctaEmail = ctaEmail;
        }
        if (typeof ctaPassWord !== 'undefined' && ctaPassWord !== null && ctaPassWord !== '') {
            console.log('ctaPassWord: [' + ctaPassWord + ']');
            elementToEdit.ctaPassWord = ctaPassWord;
            elementToEdit.hashPassword();
        }
        if (typeof estado !== 'undefined' && estado !== null) {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}