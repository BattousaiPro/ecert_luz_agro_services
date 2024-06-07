import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { KapmaeServices } from "../services/KapmaeServices";

export class KapmaeController {
    constructor(private kapmaeServices: KapmaeServices) { }

    async new(request: Request): Promise<GenericResponse> {
        // console.log('method new');
        return await this.kapmaeServices.new(request);
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method edit');
        return await this.kapmaeServices.edit(request);
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        return await this.kapmaeServices.delete(request);
    }

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method findByFilter');
        return await this.kapmaeServices.findByFilter(request);
    }

}