import { AppDataSource } from "../../data-source";
import { NextFunction, Request, Response } from "express";
import { TipCte } from "../entities/TipCte";
import { GenericResponse, StatusCode } from "../../vo/GenericResponse";

export class TipCteController {

    private repository = AppDataSource.getRepository(TipCte);

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
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

    async one(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method one');
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

    async save(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method save');
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

    async remove(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method remove');
        let resp: GenericResponse = new GenericResponse();
        let comunasToRemove: TipCte = new TipCte();
        try {
            const id = parseInt(request.params.id);
            comunasToRemove = await this.repository.findOneBy({ id });
            if (!comunasToRemove) {
                //return "this TipCte not exist";
                resp.code = '1';
                resp.data = new TipCte();
                console.log('Sin Data');
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
            const removeVal: TipCte = await this.repository.remove(comunasToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

}