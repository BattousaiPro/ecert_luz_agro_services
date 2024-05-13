import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import { GenericResponse } from "./model/GenericResponse";

export class UsuariosController {

    private repository = AppDataSource.getRepository(Usuarios)

    async all(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        return this.repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        const usuarios = await this.repository.findOne({ where: { id } });
        if (!usuarios) {
            return "unregistered usuarios";
        }
        return usuarios;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const { ctaUsr, ctaPass, tipUsr, estImp, estCop, estCar, chkRut, estCed } = request.body;
        const usuarios = Object.assign(new Usuarios(), {
            ctaUsr,
            ctaPass,
            tipUsr,
            estImp,
            estCop,
            estCar,
            chkRut,
            estCed
        });
        return this.repository.save(usuarios);
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        let resp: GenericResponse = new GenericResponse();
        const id = parseInt(request.params.id);
        let usuariosToRemove = await this.repository.findOneBy({ id });
        if (!usuariosToRemove) {
            return "this usuarios not exist";
        }
        await this.repository.remove(usuariosToRemove);
        return "usuarios has been removed";
    }

}