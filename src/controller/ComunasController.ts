import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Comunas } from "../entity/Comunas";
import { GenericResponse, StatusCode } from "./model/GenericResponse";

export class ComunasController {

    private repository = AppDataSource.getRepository(Comunas);

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas[] = [];
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
        let dataResponse: Comunas = new Comunas();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Comunas = await this.repository.findOne({ where: { id } });
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

    async save(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method save');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas = new Comunas();
        try {
            const { id, codigo, descrip } = request.body;
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

    async remove(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method remove');
        let resp: GenericResponse = new GenericResponse();
        let comunasToRemove: Comunas = new Comunas();
        try {
            const id = parseInt(request.params.id);
            comunasToRemove = await this.repository.findOneBy({ id });
            if (!comunasToRemove) {
                //return "this Comunas not exist";
                resp.code = '1';
                resp.data = new Comunas();
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
            const removeVal: Comunas = await this.repository.remove(comunasToRemove);
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