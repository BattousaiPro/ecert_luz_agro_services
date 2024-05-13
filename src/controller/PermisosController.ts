import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Permisos } from "../entity/Permisos";
import { GenericResponse } from "./model/GenericResponse";

export class PermisosController {

    private permisosRepository = AppDataSource.getRepository(Permisos)

    async all(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        return this.permisosRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id)
        const permisos = await this.permisosRepository.findOne({ where: { id } });
        if (!permisos) {
            return "unregistered permisos";
        }
        return permisos;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const { id, name, descrip } = request.body;
        const permisos = Object.assign(new Permisos(), {
            id,
            name,
            descrip
        });
        return this.permisosRepository.save(permisos);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        let permisosToRemove = await this.permisosRepository.findOneBy({ id });
        if (!permisosToRemove) {
            return "this permisos not exist";
        }
        const removeVal = await this.permisosRepository.remove(permisosToRemove);
        return "permisos has been removed";
    }

}