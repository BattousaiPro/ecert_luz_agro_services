import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { UserRolServices } from "../services/UserRolServices";

export class UserRolController {

    constructor(private userRolServices: UserRolServices) { }

    async userRol(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method userRol');
        return await this.userRolServices.userRol(request);
    }

}