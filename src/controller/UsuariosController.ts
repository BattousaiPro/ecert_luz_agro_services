import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import { GenericResponse, StatusCode } from "./model/GenericResponse";

export class UsuariosController {

    private repository = AppDataSource.getRepository(Usuarios)

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios[] = [];
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
        let dataResponse: Usuarios = new Usuarios();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Usuarios = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Usuarios();
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
        let dataResponse: Usuarios = new Usuarios();
        try {
            const { ctaUsr, ctaPass, tipUsr, estImp, estCop, estCar, chkRut, estCed } = request.body;
            const usuarios = Object.assign(new Usuarios(), {
                ctaUsr,
                ctaPass,
                tipUsr,
                estImp,
                estCop,
                estCar,
                chkRut,
                estCed
            });
            dataResponse = await this.repository.save(usuarios);
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
        let comunasToRemove: Usuarios = new Usuarios();
        try {
            const id = parseInt(request.params.id);
            comunasToRemove = await this.repository.findOneBy({ id });
            if (!comunasToRemove) {
                //return "this Usuarios not exist";
                resp.code = '1';
                resp.data = new Usuarios();
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
            const removeVal: Usuarios = await this.repository.remove(comunasToRemove);
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