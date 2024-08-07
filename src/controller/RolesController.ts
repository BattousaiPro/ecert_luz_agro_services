import { Request, Response } from "express";
import { GenericResponse, StatusCode } from "../vo/GenericResponse";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";
import { RolesVO } from "../vo/RolesVO";
import { PermisosVO } from "../vo/PermisosVO";
import { Permisos } from "../entity/Permisos";
import { Roles } from "../entity/Roles";
import permisos from "../routes/PermisosRoutes";

export class RolesController {

    private static repository = AppDataSource.getRepository(Roles);

    constructor() { }

    static getById = async (request: Request, response: Response) => {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Roles = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Roles();
                console.log('Sin Data');
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static getAll = async (request: Request, response: Response) => {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['id', 'name', 'descrip', 'code', 'estado'],
                relations: { permisos: true }
            });
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return response.status(200).send(resp);
        }
        if (dataResponse.length === 0) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return response.status(200).send(resp);
        }
        resp.data = this.convertToVOs(dataResponse, true);
        return response.send(resp);
    }

    static new = async (request: Request, response: Response) => {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
        try {
            const {
                name, descrip, code
            } = request.body;
            try {
                let toNew: Roles = await this.repository.findOneBy({
                    name
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Rol ya existe';
                    return response.status(200).send(resp);
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return response.status(200).send(resp);
            }

            try {
                const newElement = Object.assign(new Roles(), {
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
        return response.send(resp);
    }

    static edit = async (request: Request, response: Response) => {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
        let elementToEdit: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            elementToEdit = await this.repository.findOneBy({ id });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Roles();
                console.log('Rol no existe');
                return response.status(200).send(resp);
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return response.status(200).send(resp);
        }

        try {
            elementToEdit = this.getObjectEdit(request, elementToEdit);
            dataResponse = await this.repository.save(elementToEdit);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static delete = async (request: Request, response: Response) => {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let rolesToRemove: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            rolesToRemove = await this.repository.findOneBy({ id });
            if (!rolesToRemove) {
                resp.code = '1';
                resp.data = new Roles();
                resp.message = StatusCode.ERROR + ': Rol no existe';
                return response.status(200).send(resp);
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Rol';
            resp.data = null;
            return response.status(200).send(resp);
        }

        try {
            const removeVal: Roles = await this.repository.remove(rolesToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static findByFilter = async (request: Request, response: Response) => {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { name, descrip, limit, pageSize } = request.body;
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
            const results: RolesVO[] = this.convertToVOs(rolList, true);
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
        return response.send(resp);
    }

    private static convertToVOs(input: Roles[], showPermisos: boolean): RolesVO[] {
        let salida: RolesVO[] = [];
        if (input) {
            for (let index = 0; index < input.length; index++) {
                salida.push(this.convertToVO(input[index], showPermisos));
            }
        }
        return salida;
    }

    private static convertToVO(input: Roles, showPermisos: boolean): RolesVO {
        let item: RolesVO = new RolesVO();
        item = new RolesVO();
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

    private static convertToPermisoVOs(input: Permisos[]): PermisosVO[] {
        let salida: PermisosVO[] = [];
        if (input) {
            for (let index = 0; index < input.length; index++) {
                salida.push(this.convertToPermisoVO(input[index]));
            }
        }
        return salida;
    }

    private static convertToPermisoVO(input: Permisos): PermisosVO {
        let item: PermisosVO = new PermisosVO();
        item = new PermisosVO();
        item.id = input.id;
        item.name = input.name;
        item.descrip = input.descrip;
        item.code = input.code;
        item.estado = input.estado;
        return item;
    }

    private static getObjectEdit(request: Request, elementToEdit: Roles): Roles {
        const { name, descrip, code, estado } = request.body;
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
        if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}