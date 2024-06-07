import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { RolPermisoServices } from "../services/RolPermisoServices";

export class RolPermisoController {

    constructor(private rolPermisoServices: RolPermisoServices) { }

    async rolPermiso(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method rolPermiso');
        return await this.rolPermisoServices.rolPermiso(request);
    }

}