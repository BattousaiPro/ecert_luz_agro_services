import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Permisos } from "../entity/Permisos";
import { GenericResponse, StatusCode } from "./model/GenericResponse";
import { PermisosVO } from "../vo/PermisosVO";

export class PermisosController {

    private repository = AppDataSource.getRepository(Permisos);

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos[] = [];
        try {
            dataResponse = await this.repository.find();
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            dataResponse = null;
        }
        resp.data = this.convertToVOs(dataResponse);
        return resp;
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method one');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos = new Permisos();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Permisos = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Permisos();
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

    async save(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method save');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos = new Permisos();
        try {
            const { name, descrip, code, estado } = request.body;
            const permisos = Object.assign(new Permisos(), {
                name,
                descrip,
                code,
                estado
            });
            dataResponse = await this.repository.save(permisos);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async editPermisos(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method editUser');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos = new Permisos();
        let usuariosToEdit: Permisos = new Permisos();
        try {
            const id = parseInt(request.params.id);
            usuariosToEdit = await this.repository.findOneBy({ id });
            if (!usuariosToEdit) {
                //return "this Permisos not exist";
                resp.code = '1';
                resp.data = new Permisos();
                console.log('Permisos not exist');
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

    async remove(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method remove');
        let resp: GenericResponse = new GenericResponse();
        let permisosToRemove: Permisos = new Permisos();
        try {
            const id = parseInt(request.params.id);
            permisosToRemove = await this.repository.findOneBy({ id });
            if (!permisosToRemove) {
                //return "this Permisos not exist";
                resp.code = '1';
                resp.data = new Permisos();
                console.log('Permisos not exist');
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
            const removeVal: Permisos = await this.repository.remove(permisosToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    private convertToVOs(inputUser: Permisos[]): PermisosVO[] {
        let salidaUser: PermisosVO[] = [];
        let itemUser: PermisosVO = new PermisosVO();
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Permisos): PermisosVO {
        let itemUser: PermisosVO = new PermisosVO();
        itemUser = new PermisosVO();
        itemUser.id = inputUser.id;
        itemUser.name = inputUser.name;
        itemUser.descrip = inputUser.descrip;
        itemUser.code = inputUser.code;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}