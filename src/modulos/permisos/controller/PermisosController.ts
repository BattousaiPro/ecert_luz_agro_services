import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Permisos } from "../entities/Permisos";
import { Like } from "typeorm";
import { PermisosVO } from "../../../vo/PermisosVO";

export class PermisosController {

    private repository = AppDataSource.getRepository(Permisos);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
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

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
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

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos = new Permisos();
        let permisoToNew: Permisos = new Permisos();
        const { name, descrip, code, estado } = request.body;
        try {
            permisoToNew = await this.repository.findOneBy({ name, code });
            if (permisoToNew) {
                resp.code = '-2';
                resp.data = new Permisos();
                console.log('Permisos ya existe');
                resp.message = 'Permiso ya existe';
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

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method edit');
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

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method delete');
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

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        let resp: GenericResponse = new GenericResponse();
        console.log('method findByFilter');
        const { name, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        name: name ? Like('%' + name + '%') : null,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: pageSize,
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