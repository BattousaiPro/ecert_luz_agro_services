import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { RolPermiso } from "../entities/RolPermiso";

export class RolPermisoController {

    private repository = AppDataSource.getRepository(RolPermiso);


    async deletePermisosRol(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method deletePermisosRol');
        let resp: GenericResponse = new GenericResponse();
        let registroToRemove: RolPermiso[] = [];
        try {
            const idRol = parseInt(request.params.idrol);
            registroToRemove = await this.repository.find({where: { rolId: idRol }});
            if (!registroToRemove) {
                resp.code = '1';
                //resp.data = new Comunas();
                //resp.message = StatusCode.ERROR + ': Comuna no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al obtener los permisos de los roles';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: any = await this.repository.remove(registroToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

}