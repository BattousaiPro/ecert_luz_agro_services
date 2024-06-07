import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { UserRolServices } from "../services/UserRolServices";
import { UserRol } from "../entities/UserRol";
import { AppDataSource } from "../../../data-source";

export class UserRolController {

    private repository = AppDataSource.getRepository(UserRol);

    constructor(private userRolServices: UserRolServices) { }

    async userRol(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method userRol');
        /*return await this.userRolServices.userRol(request);*/
        let resp: GenericResponse = new GenericResponse();
        let registroToRemove: UserRol[] = [];
        let isDelete: boolean = false;
        const {
            listRolesId
        } = request.body;
        // console.log('listRolesId: ' + JSON.stringify(listRolesId));
        // console.log('Paso Uno');
        try {
            const idUser = parseInt(request.params.iduser);
            // console.log('idUser: ' + idUser);
            registroToRemove = await this.repository.find({ where: { userId: idUser } });
            // console.log('registroToRemove: ' + JSON.stringify(registroToRemove));
            if (registroToRemove !== null
                && typeof registroToRemove !== 'undefined'
                && registroToRemove.length > 0) {
                isDelete = true;
                console.log('Tiene Roles asignados para eliminar');
            }
        } catch (error) {
            resp.code = '-3';
            resp.message = StatusCode.ERROR + ': Al obtener los roles de los usuario';
            resp.data = null;
            return resp;
        }
        // console.log('Paso Dos');
        if (isDelete) {
            try {
                const removeVal: any = await this.repository.remove(registroToRemove);
                console.log('Roles existentes Eliminados');
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
        }
        // console.log('Paso Tres');
        try {
            const idUser = parseInt(request.params.iduser);
            let saveUserRol: UserRol[] = [];
            for (let index = 0; index < listRolesId.length; index++) {
                let item: UserRol = new UserRol();
                item.userId = idUser;
                item.rolId = listRolesId[index];;
                saveUserRol.push(item);
            }
            // console.log(JSON.stringify(saveUserRol));
            const removeVal: any = await this.repository.save(saveUserRol);
            console.log('Nuevo set de roles asignados correctamente');
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