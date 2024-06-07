import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { ComunasServices } from "../services/ComunasServices";

export class ComunasController {

    constructor(private comunasServices: ComunasServices) { }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        return await this.comunasServices.getAll();
    }

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method new');
        return await this.comunasServices.new(request);
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method edit');
        return await this.comunasServices.edit(request);
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        return await this.comunasServices.delete(request);
    }

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method findByFilter');
        return await this.comunasServices.findByFilter(request);
    }

}