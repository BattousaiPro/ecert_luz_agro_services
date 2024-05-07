import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Comunas } from "../entity/Comunas";

export class ComunasController {

    private ComunasRepository = AppDataSource.getRepository(Comunas)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.ComunasRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const comunas = await this.ComunasRepository.findOne({
            where: { id }
        })
        if (!comunas) {
            return "unregistered comunas";
        }
        return comunas
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, codigo, descrip } = request.body;
        const comunas = Object.assign(new Comunas(), {
            id,
            codigo,
            descrip
        })
        return this.ComunasRepository.save(comunas)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        let ComunasToRemove = await this.ComunasRepository.findOneBy({ id });
        if (!ComunasToRemove) {
            return "this comunas not exist";
        }
        await this.ComunasRepository.remove(ComunasToRemove);
        return "comunas has been removed";
    }

}