import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { UserServices } from "../services/UserServices";

export class UserController {

    constructor(private userServices: UserServices) { }

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        return await this.userServices.getAll();
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
        return await this.userServices.getById(request);
    }

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method new');
        return await this.userServices.new(request);
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method edit');
        return await this.userServices.edit(request);
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        return await this.userServices.delete(request);
    }

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method findByFilter');
        return await this.userServices.findByFilter(request);
    }

}