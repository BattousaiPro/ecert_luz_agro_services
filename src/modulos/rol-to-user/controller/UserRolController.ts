import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { UserRol } from "../entities/UserRol";

export class UserRolController {

    private repository = AppDataSource.getRepository(UserRol);


    async userRol(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method userRol');
        let resp: GenericResponse = new GenericResponse();
        let registroToRemove: UserRol[] = [];
        const {
            listRoles
        } = request.body;
        // console.log(JSON.stringify(listRoles));
        // console.log('Paso Uno');
        try {
            const idUser = parseInt(request.params.iduser);
            registroToRemove = await this.repository.find({ where: { userId: idUser } });
            // console.log(JSON.stringify(registroToRemove));
            if (registroToRemove !== null
                && typeof registroToRemove !== 'undefined'
                && registroToRemove.length === 0) {
                resp.code = '-4';
                resp.message = StatusCode.ERROR + ': Relación de Roles no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-3';
            resp.message = StatusCode.ERROR + ': Al obtener los roles de los usuario';
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
            const idUser = parseInt(request.params.iduser);
            let saveUserRol: UserRol[] = [];
            for (let index = 0; index < listRoles.length; index++) {
                let item: UserRol = new UserRol();
                item.userId = idUser;
                item.rolId = listRoles[index];;
                saveUserRol.push(item);
            }
            // console.log(JSON.stringify(saveUserRol));
            const removeVal: any = await this.repository.save(saveUserRol);
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