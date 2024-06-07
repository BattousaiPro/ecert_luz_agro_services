import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { ComunasServices } from "../services/ComunasServices";
import { Comunas } from "../entities/Comunas";
import { ComunasVO } from "../dto/ComunasVO";
import { AppDataSource } from "../../../data-source";
import { Like } from "typeorm";

export class ComunasController {

    private repository = AppDataSource.getRepository(Comunas);

    constructor(private comunasServices: ComunasServices) { }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        /*return await this.comunasServices.getAll();*/
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['codigo', 'descrip', 'estado']
            });
        } catch (error) {
            resp.code = '-1';
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

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method new');
        /*return await this.comunasServices.new(request);*/
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas = new Comunas();
        try {
            const {
                codigo, descrip
            } = request.body;
            try {
                let toNew: Comunas = await this.repository.findOneBy({
                    codigo
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Comuna ya existe';
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
                const newElement = Object.assign(new Comunas(), {
                    codigo, descrip, estado: true
                });
                dataResponse = await this.repository.save(newElement);
                resp.data = dataResponse.codigo;
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

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method edit');
        /*return await this.comunasServices.edit(request);*/
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas = new Comunas();
        let elementToEdit: Comunas = new Comunas();
        try {
            const codigo = parseInt(request.params.codigo);
            elementToEdit = await this.repository.findOneBy({ codigo });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Comunas();
                console.log('Comuna no existe');
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
            const { descrip, estado } = request.body;
            if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
                console.log('descrip: [' + descrip + ']');
                elementToEdit.descrip = descrip;
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

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        /*return await this.comunasServices.delete(request);*/
        let resp: GenericResponse = new GenericResponse();
        let RegistroToRemove: Comunas = new Comunas();
        try {
            const codigo = parseInt(request.params.codigo);
            RegistroToRemove = await this.repository.findOneBy({ codigo });
            if (!RegistroToRemove) {
                resp.code = '1';
                resp.data = new Comunas();
                resp.message = StatusCode.ERROR + ': Comuna no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar la Comuna';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Comunas = await this.repository.remove(RegistroToRemove);
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
        // console.log('method findByFilter');
        /*return await this.comunasServices.findByFilter(request);*/
        let resp: GenericResponse = new GenericResponse();
        const { codigo, descrip, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        codigo: codigo ? codigo : null,
                        descrip: descrip ? Like('%' + descrip + '%') : null,
                    },
                    order: { codigo: "DESC" },
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

    private convertToVOs(inputUser: Comunas[]): ComunasVO[] {
        let salidaUser: ComunasVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Comunas): ComunasVO {
        let itemUser: ComunasVO = new ComunasVO();
        itemUser = new ComunasVO();
        itemUser.codigo = inputUser.codigo;
        itemUser.descrip = inputUser.descrip;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}