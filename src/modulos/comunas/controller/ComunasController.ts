import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Comunas } from "../entities/Comunas";
import { Like } from "typeorm";
import { ComunasVO } from "../dto/ComunasVO";

export class ComunasController {

    private repository = AppDataSource.getRepository(Comunas);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
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

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas = new Comunas();
        try {
            const codigo = parseInt(request.params.codigo);
            dataResponse = await this.repository.findOne({
                where: { codigo }
            });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Comunas();
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
        let dataResponse: Comunas = new Comunas();
        try {
            const id = parseInt(request.params.id);
            const { codigo, descrip } = request.body;
            const comuna = Object.assign(new Comunas(), {
                id,
                codigo,
                descrip
            });
            dataResponse = await this.repository.save(comuna);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        return resp;
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
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
        let resp: GenericResponse = new GenericResponse();
        console.log('method findByFilter');
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