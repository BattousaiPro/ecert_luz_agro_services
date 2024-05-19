import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Roles } from "../entity/Roles";
import { GenericResponse, StatusCode } from "./model/GenericResponse";
import { RolesVO } from "../vo/RolesVO";

export class RolesController {

    private repository = AppDataSource.getRepository(Roles);

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles[] = [];
        try {
            dataResponse = await this.repository.find();
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            dataResponse = null;
        }
        resp.data = dataResponse;
        return resp;
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method one');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
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
        return resp;
    }

    async editRoles(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method editUser');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
        let usuariosToEdit: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            usuariosToEdit = await this.repository.findOneBy({ id });
            if (!usuariosToEdit) {
                //return "this Roles not exist";
                resp.code = '1';
                resp.data = new Roles();
                console.log('Roles not exist');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const { name, descrip, code, estado } = request.body;
            if (typeof name !== 'undefined' && name !== null && name !== '') {
                console.log('name[: ' + name + ']');
                usuariosToEdit.name = name;
            }
            if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
                console.log('descrip:[ ' + descrip + ']');
                usuariosToEdit.descrip = descrip;
            }
            if (typeof code !== 'undefined' && code !== null && code !== '') {
                console.log('code: [' + code + ']');
                usuariosToEdit.code = code;
            }
            if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
                console.log('estado[: ' + estado + ']');
                usuariosToEdit.estado = estado;
            }
            dataResponse = await this.repository.save(usuariosToEdit);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        return resp;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method save');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
        let rolToNew: Roles = new Roles();
        const { name, descrip, code, estado } = request.body;
        try {
            rolToNew = await this.repository.findOneBy({ name, code });
            if (rolToNew) {
                resp.code = '-2';
                resp.data = new Roles();
                resp.message = 'Rol ya existe';
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const roles = Object.assign(new Roles(), {
                name,
                descrip,
                code,
                estado
            });
            dataResponse = await this.repository.save(roles);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method remove');
        let resp: GenericResponse = new GenericResponse();
        let rolesToRemove: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            rolesToRemove = await this.repository.findOneBy({ id });
            if (!rolesToRemove) {
                //return "this Roles not exist";
                resp.code = '1';
                resp.data = new Roles();
                console.log('Rol not exist');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
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
        return resp;
    }

    private convertToVOs(inputUser: Roles[]): RolesVO[] {
        let salidaUser: RolesVO[] = [];
        let itemUser: RolesVO = new RolesVO();
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Roles): RolesVO {
        let itemUser: RolesVO = new RolesVO();
        itemUser = new RolesVO();
        itemUser.id = inputUser.id;
        itemUser.name = inputUser.name;
        itemUser.descrip = inputUser.descrip;
        itemUser.code = inputUser.code;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}