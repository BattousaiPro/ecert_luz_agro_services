import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Usuarios } from "../entity/Usuarios";
import { GenericResponse, StatusCode } from "./model/GenericResponse";
import { UsuariosVO } from "../vo/UsuariosVO";

export class UserController {

    private repository = AppDataSource.getRepository(Usuarios);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let users: Usuarios[] = [];
        try {
            users = await this.repository.find({ select: ['id', 'ctaUsr', 'ctaEmail', 'estado'] });
        } catch (e) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Somenthing goes wrong!';
            resp.data = null;
            return resp;
        }
        if (users.length === 0) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Not result';
            resp.data = null;
            return resp;
        }
        resp.data = this.convertToVOs(users);
        return resp;
    }

    async newUser(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method newUser');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios = new Usuarios();
        try {
            const { ctaUsr, ctaPass, ctaEmail } = request.body;

            const usuarios = new Usuarios();
            usuarios.ctaUsr = ctaUsr;
            usuarios.ctaPass = ctaPass;
            usuarios.ctaEmail = ctaEmail;
            usuarios.tipUsr = 1;
            usuarios.estImp = 1;
            usuarios.estCop = 1;
            usuarios.estCar = 1;
            usuarios.chkRut = 1;
            usuarios.estCed = 1;
            usuarios.estado = true;
            dataResponse = await this.repository.save(usuarios);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    private convertToVOs(inputUser: Usuarios[]): UsuariosVO[] {
        let salidaUser: UsuariosVO[] = [];
        let itemUser: UsuariosVO = new UsuariosVO();
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Usuarios): UsuariosVO {
        let itemUser: UsuariosVO = new UsuariosVO();
        itemUser = new UsuariosVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUsr = inputUser.ctaUsr;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}