import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { TipCte } from "../entity/TipCte";
import { GenericResponse } from "./model/GenericResponse";

export class TipCteController {

    private repository = AppDataSource.getRepository(TipCte)

    async all(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        return this.repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        const tipCte = await this.repository.findOne({ where: { id } });
        if (!tipCte) {
            return "unregistered tipCte";
        }
        return tipCte;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const { id, codCte, desCte } = request.body;
        const tipCte = Object.assign(new TipCte(), {
            id,
            codCte,
            desCte
        });
        return this.repository.save(tipCte);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        let tipCteToRemove = await this.repository.findOneBy({ id });
        if (!tipCteToRemove) {
            return "this tipCte not exist";
        }
        await this.repository.remove(tipCteToRemove);
        return "tipCte has been removed";
    }

}