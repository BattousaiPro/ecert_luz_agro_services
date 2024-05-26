import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { TipCte } from "../entities/TipCte";



export class TipCteController {

    private repository = AppDataSource.getRepository(TipCte);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: TipCte[] = [];
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

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: TipCte = new TipCte();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: TipCte = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new TipCte();
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
        let dataResponse: TipCte = new TipCte();
        try {
            const { id, codCte, desCte } = request.body;
            const tipCte = Object.assign(new TipCte(), {
                id,
                codCte,
                desCte
            });
            dataResponse = await this.repository.save(tipCte);
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
        let tipCteToRemove: TipCte = new TipCte();
        try {
            const id = parseInt(request.params.id);
            tipCteToRemove = await this.repository.findOneBy({ id });
            if (!tipCteToRemove) {
                resp.code = '1';
                resp.data = new TipCte();
                resp.message = StatusCode.ERROR + ': TipCte no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el TipCte';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: TipCte = await this.repository.remove(tipCteToRemove);
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
        const { codCte, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        codCte: codCte ? codCte : null,
                    },
                    order: { codCte: "ASC" },
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

    /*private convertToVOs(inputUser: TipCte[]): TipCteVO[] {
        let salidaUser: TipCteVO[] = [];
        let itemUser: TipCteVO = new TipCteVO();
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: TipCte): TipCteVO {
        let itemUser: TipCteVO = new TipCteVO();
        itemUser = new TipCteVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUsr = inputUser.ctaUsr;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }*/

}