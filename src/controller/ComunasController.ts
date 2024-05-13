import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Comunas } from "../entity/Comunas";
import { GenericResponse, StatusCode } from "./model/GenericResponse";

export class ComunasController {

    private ComunasRepository = AppDataSource.getRepository(Comunas)

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        let resp: GenericResponse = new GenericResponse();
        let comunasList: Comunas[] = [];
        resp.code = '0';
        try {
            comunasList = await this.ComunasRepository.find();
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            comunasList = null;
        }
        resp.data = comunasList;
        return resp;
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        const comunas = await this.ComunasRepository.findOne({
            where: { id }
        })
        if (!comunas) {
            return "unregistered comunas";
        }
        return comunas
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const { id, codigo, descrip } = request.body;
        const comunas = Object.assign(new Comunas(), {
            id,
            codigo,
            descrip
        })
        return this.ComunasRepository.save(comunas)
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        let ComunasToRemove = await this.ComunasRepository.findOneBy({ id });
        if (!ComunasToRemove) {
            return "this comunas not exist";
        }
        await this.ComunasRepository.remove(ComunasToRemove);
        return "comunas has been removed";
    }

}