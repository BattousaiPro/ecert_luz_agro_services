import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { Permiso } from "../entity/permiso.entity";
import { PermisoRequestDto } from "../dto/models.dto";
import { PermisoDto } from "../dto/Permiso.dto";

@Injectable()
export class PermisoService {

    constructor(@InjectRepository(Permiso) private repository: Repository<Permiso>) { }

    async getAll(): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permiso[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['id', 'name', 'descrip', 'code', 'estado']
            });
        } catch (error) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }
        if (dataResponse.length === 0) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return resp;
        }
        resp.data = this.convertToVOs(dataResponse);
        return resp;
    }

    async new(reqNew: PermisoRequestDto): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permiso = new Permiso();
        try {
            const {
                name, descrip, code
            } = reqNew;
            try {
                let toNew: Permiso = await this.repository.findOneBy({
                    name, code
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Permiso ya existe';
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
                const newElement = Object.assign(new Permiso(), {
                    name, descrip, code, estado: true
                });
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

    async edit(reqEdit: PermisoRequestDto, id: number): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permiso = new Permiso();
        let elementToEdit: Permiso = new Permiso();
        try {
            //const id = parseInt(request.params.id);
            elementToEdit = await this.repository.findOneBy({ id });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Permiso();
                console.log('Permiso no existe');
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
            return resp;
        }
        return resp;
    }

    async delete(id: number): Promise<GenericResponse> {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let RegistroToRemove: Permiso = new Permiso();
        try {
            //const id = parseInt(request.params.id);
            RegistroToRemove = await this.repository.findOneBy({ id });
            if (!RegistroToRemove) {
                resp.code = '1';
                resp.data = new Permiso();
                resp.message = StatusCode.ERROR + ': Permiso no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Permiso';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Permiso = await this.repository.remove(RegistroToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(reqFindByFilter: PermisoRequestDto): Promise<GenericResponse> {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { name, descrip, limit, pageSize } = reqFindByFilter;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        name: name ? Like('%' + name + '%') : null,
                        descrip: descrip ? Like('%' + descrip + '%') : null,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: (pageSize - 1) * limit
                }
            );
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

    private convertToVOs(inputUser: Permiso[]): PermisoDto[] {
        let salidaUser: PermisoDto[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Permiso): PermisoDto {
        let itemUser: PermisoDto = new PermisoDto();
        itemUser = new PermisoDto();
        itemUser.id = inputUser.id;
        itemUser.name = inputUser.name;
        itemUser.descrip = inputUser.descrip;
        itemUser.code = inputUser.code;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

    private getObjectEdit(request: PermisoRequestDto, elementToEdit: Permiso): Permiso {
        const { name, descrip, code, estado } = request;
        if (typeof name !== 'undefined' && name !== null && name !== '') {
            console.log('name: [' + name + ']');
            elementToEdit.name = name;
        }
        if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
            console.log('descrip: [' + descrip + ']');
            elementToEdit.descrip = descrip;
        }
        if (typeof code !== 'undefined' && code !== null && code !== '') {
            console.log('code: [' + code + ']');
            elementToEdit.code = code;
        }
        if (typeof estado !== 'undefined' && estado !== null) {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}