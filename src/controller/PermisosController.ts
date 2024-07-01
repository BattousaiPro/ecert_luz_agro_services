import { NextFunction, Request, Response } from "express";
import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Permisos } from "../entity/Permisos";
import { GenericResponse, StatusCode } from "../vo/GenericResponse";
import { PermisosVO } from "../vo/PermisosVO";

export class PermisosController {

    private repository = AppDataSource.getRepository(Permisos);

    constructor() { }

    async getAll(request: Request, response: Response) {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos[] = [];
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

    async new(request: Request, response: Response) {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos = new Permisos();
        try {
            const {
                name, descrip, code
            } = request.body;
            try {
                let toNew: Permisos = await this.repository.findOneBy({
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
                const newElement = Object.assign(new Permisos(), {
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

    async edit(request: Request, response: Response) {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Permisos = new Permisos();
        let elementToEdit: Permisos = new Permisos();
        try {
            const id = parseInt(request.params.id);
            elementToEdit = await this.repository.findOneBy({ id });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Permisos();
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

    async delete(request: Request, response: Response) {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let RegistroToRemove: Permisos = new Permisos();
        try {
            const id = parseInt(request.params.id);
            RegistroToRemove = await this.repository.findOneBy({ id });
            if (!RegistroToRemove) {
                resp.code = '1';
                resp.data = new Permisos();
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
            const removeVal: Permisos = await this.repository.remove(RegistroToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(request: Request, response: Response) {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { name, descrip, limit, pageSize } = request.body;
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

    private convertToVOs(inputUser: Permisos[]): PermisosVO[] {
        let salidaUser: PermisosVO[] = [];
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