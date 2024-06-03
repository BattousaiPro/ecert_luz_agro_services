import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { RolPermiso } from "../entities/RolPermiso";

export class RolPermisoController {

    private repository = AppDataSource.getRepository(RolPermiso);


    async rolPermiso(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method rolPermiso');
        let resp: GenericResponse = new GenericResponse();
        let registroToRemove: RolPermiso[] = [];
        const {
            listPermisos
        } = request.body;
        // console.log('Paso Uno');
        try {
            const idRol = parseInt(request.params.idrol);
            registroToRemove = await this.repository.find({ where: { rolId: idRol } });
            // console.log(JSON.stringify(registroToRemove));
            if (registroToRemove !== null
                && typeof registroToRemove !== 'undefined'
                && registroToRemove.length === 0) {
                resp.code = '-4';
                resp.message = StatusCode.ERROR + ': Relación de Permisos no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-3';
            resp.message = StatusCode.ERROR + ': Al obtener los permisos de los roles';
            resp.data = null;
            return resp;
        }
        // console.log('Paso Dos');
        try {
            const removeVal: any = await this.repository.remove(registroToRemove);
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        // console.log('Paso Tres');
        try {
            const idRol = parseInt(request.params.idrol);
            let saveRolPermiso: RolPermiso[] = [];
            for (let index = 0; index < listPermisos.length; index++) {
                let item: RolPermiso = new RolPermiso();
                item.rolId = idRol;
                item.permisoId = listPermisos[index];
                saveRolPermiso.push(item);
            }
            const removeVal: any = await this.repository.save(saveRolPermiso);
            resp.data = null;
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

}