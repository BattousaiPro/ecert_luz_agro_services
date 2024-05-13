import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Sector } from "../entity/Sector";
import { GenericResponse } from "./model/GenericResponse";

export class SectorController {

    private repository = AppDataSource.getRepository(Sector)

    async all(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        return this.repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        const sector = await this.repository.findOne({ where: { id } });
        if (!sector) {
            return "unregistered sector";
        }
        return sector;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const { id, codigo, descrip, diaCar, codCob } = request.body;
        const sector = Object.assign(new Sector(), {
            id,
            codigo,
            descrip,
            diaCar,
            codCob
        });
        return this.repository.save(sector);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        let SectorToRemove = await this.repository.findOneBy({ id });
        if (!SectorToRemove) {
            return "this sector not exist";
        }
        await this.repository.remove(SectorToRemove);
        return "sector has been removed";
    }

}