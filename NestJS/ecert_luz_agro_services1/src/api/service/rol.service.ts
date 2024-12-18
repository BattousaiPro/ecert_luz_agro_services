import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { Permiso } from "../entity/permiso.entity";
import { RolRequestDto } from "../dto/models.dto";
import { PermisoDto } from "../dto/Permiso.dto";
import { Rol } from "../entity/rol.entity";
import { RolDto } from "../dto/Rol.dto";

@Injectable()
export class RolService {

    constructor(@InjectRepository(Rol) private repository: Repository<Rol>) { }

    async getById(id: number): Promise<GenericResponse> {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        try {
            //const id = parseInt(request.params.id);
            const dataResponse: Rol = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Rol();
                console.log('Sin Data');
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async getAll(): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Rol[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['id', 'name', 'descrip', 'code', 'estado'],
                relations: { permisos: true }
            });
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }
        if (dataResponse.length === 0) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return resp;
        }
        resp.data = this.convertToVOs(dataResponse, true);
        return resp;
    }

    async new(reqNew: RolRequestDto): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Rol = new Rol();
        try {
            const {
                name, descrip, code
            } = reqNew;
            try {
                let toNew: Rol = await this.repository.findOneBy({
                    name
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Rol ya existe';
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
                const newElement = Object.assign(new Rol(), {
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

    async edit(reqEdit: RolRequestDto, id: number): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Rol = new Rol();
        let elementToEdit: Rol = new Rol();
        try {
            //const id = parseInt(request.params.id);
            elementToEdit = await this.repository.findOneBy({ id });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Rol();
                console.log('Rol no existe');
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
        let rolesToRemove: Rol = new Rol();
        try {
            //const id = parseInt(request.params.id);
            rolesToRemove = await this.repository.findOneBy({ id });
            if (!rolesToRemove) {
                resp.code = '1';
                resp.data = new Rol();
                resp.message = StatusCode.ERROR + ': Rol no existe';
                return resp;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Rol';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Rol = await this.repository.remove(rolesToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(reqFindByFilter: RolRequestDto): Promise<GenericResponse> {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { name, descrip, limit, pageSize } = reqFindByFilter;
        try {
            const [rolList, totalReg] = await this.repository.findAndCount(
                {
                    relations: { permisos: true },
                    where: {
                        name: name ? Like('%' + name + '%') : null,
                        descrip: descrip ? Like('%' + descrip + '%') : null,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: (pageSize - 1) * limit
                }
            );
            const results: RolDto[] = this.convertToVOs(rolList, true);
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

    private convertToVOs(input: Rol[], showPermisos: boolean): RolDto[] {
        let salida: RolDto[] = [];
        if (input) {
            for (let index = 0; index < input.length; index++) {
                salida.push(this.convertToVO(input[index], showPermisos));
            }
        }
        return salida;
    }

    private convertToVO(input: Rol, showPermisos: boolean): RolDto {
        let item: RolDto = new RolDto();
        item = new RolDto();
        item.id = input.id;
        item.name = input.name;
        item.descrip = input.descrip;
        item.code = input.code;
        item.estado = input.estado;
        if (showPermisos) {
            item.permisos = this.convertToPermisoVOs(input.permisos);
        }
        return item;
    }

    private convertToPermisoVOs(input: Permiso[]): PermisoDto[] {
        let salida: PermisoDto[] = [];
        if (input) {
            for (let index = 0; index < input.length; index++) {
                salida.push(this.convertToPermisoVO(input[index]));
            }
        }
        return salida;
    }

    private convertToPermisoVO(input: Permiso): PermisoDto {
        let item: PermisoDto = new PermisoDto();
        item = new PermisoDto();
        item.id = input.id;
        item.name = input.name;
        item.descrip = input.descrip;
        item.code = input.code;
        item.estado = input.estado;
        return item;
    }

    private getObjectEdit(request: RolRequestDto, elementToEdit: Rol): Rol {
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