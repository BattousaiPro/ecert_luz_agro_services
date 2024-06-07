import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { SectorServices } from "../services/SectorServices";

export class SectorController {

    constructor(private sectorServices: SectorServices) { }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        return await this.sectorServices.getAll();
    }

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method new');
        return await this.sectorServices.new(request);
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method edit');
        return await this.sectorServices.edit(request);
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        return await this.sectorServices.delete(request);
    }

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method findByFilter');
        return await this.sectorServices.findByFilter(request);
    }

}