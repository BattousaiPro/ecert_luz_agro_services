import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../data-source";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { UserRol } from "../entities/UserRol";

export class UserRolController {

    private repository = AppDataSource.getRepository(UserRol);


    async deleteRolUser(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method deleteRolUser');
        let resp: GenericResponse = new GenericResponse();
        let registroToRemove: UserRol[] = [];
        try {
            const idUser = parseInt(request.params.iduser);
            registroToRemove = await this.repository.find({where: { userId: idUser }});
            if (!registroToRemove) {
                resp.code = '1';
                //resp.data = new Comunas();
                //resp.message = StatusCode.ERROR + ': Comuna no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al obtener los roles de los usuario';
            resp.data = null;
            return resp;
        }
        /*
        try {
            const removeVal: any = await this.repository.remove(registroToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }*/
        return resp;
    }

}