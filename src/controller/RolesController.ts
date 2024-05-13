import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Roles } from "../entity/Roles";
import { GenericResponse, StatusCode } from "./model/GenericResponse";

export class RolesController {

    private repository = AppDataSource.getRepository(Roles);

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles[] = [];
        try {
            dataResponse = await this.repository.find();
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            dataResponse = null;
        }
        resp.data = dataResponse;
        return resp;
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method one');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Roles = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Roles();
                console.log('Sin Data');
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method save');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles = new Roles();
        try {
            const { id, name, descrip, estado } = request.body;
            const roles = Object.assign(new Roles(), {
                id,
                name,
                descrip,
                estado
            });
            dataResponse = await this.repository.save(roles);
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method remove');
        let resp: GenericResponse = new GenericResponse();
        let rolesToRemove: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            rolesToRemove = await this.repository.findOneBy({ id });
            if (!rolesToRemove) {
                //return "this comunas not exist";
                resp.code = '1';
                resp.data = new Roles();
                console.log('Sin Data');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Roles = await this.repository.remove(rolesToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error))
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

}