import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Comunas } from "../entity/Comunas";
import { GenericResponse, StatusCode } from "./model/GenericResponse";

export class ComunasController {

    private ComunasRepository = AppDataSource.getRepository(Comunas)

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas[] = [];
        resp.code = '0';
        try {
            dataResponse = await this.ComunasRepository.find();
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            dataResponse = null;
        }
        resp.data = dataResponse;
        return resp;
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        const dataResponse = await this.ComunasRepository.findOne({ where: { id } });
        if (!dataResponse) {
            return "unregistered comunas";
        }
        return dataResponse;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const { id, codigo, descrip } = request.body;
        const comuna = Object.assign(new Comunas(), {
            id,
            codigo,
            descrip
        });
        return this.ComunasRepository.save(comuna);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        let ComunasToRemove = await this.ComunasRepository.findOneBy({ id });
        if (!ComunasToRemove) {
            return "this comunas not exist";
        }
        const removeVal = await this.ComunasRepository.remove(ComunasToRemove);
        return "comunas has been removed";
    }

}