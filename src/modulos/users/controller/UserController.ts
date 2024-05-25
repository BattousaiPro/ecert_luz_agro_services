import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { Usuarios } from "../entities/Usuarios";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { UsuariosVO } from "../../../vo/UsuariosVO";
import { Like } from "typeorm";

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

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        return resp;
    }

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios = new Usuarios();
        let usuariosToNew: Usuarios = new Usuarios();
        const { ctaUsr, ctaPass, ctaEmail } = request.body;
        try {
            usuariosToNew = await this.repository.findOneBy({ ctaUsr });
            if (usuariosToNew) {
                resp.code = '-2';
                resp.data = new Usuarios();
                resp.message = 'Usuario ya existe';
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
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

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios = new Usuarios();
        let usuariosToEdit: Usuarios = new Usuarios();
        try {
            const id = parseInt(request.params.id);
            usuariosToEdit = await this.repository.findOneBy({ id });
            if (!usuariosToEdit) {
                //return "this Usuarios not exist";
                resp.code = '1';
                resp.data = new Usuarios();
                console.log('Usuarios not exist');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const { ctaUsr, ctaPass, ctaEmail, estado } = request.body;
            if (typeof ctaUsr !== 'undefined' && ctaUsr !== null && ctaUsr !== '') {
                console.log('ctaUsr[: ' + ctaUsr + ']');
                usuariosToEdit.ctaUsr = ctaUsr;
            }
            /*if (typeof ctaPass !== 'undefined' && ctaPass !== null && ctaPass !== '') {
                console.log('ctaPass:[ ' + ctaPass + ']');
                usuariosToEdit.ctaPass = ctaPass;
            }*/
            if (typeof ctaEmail !== 'undefined' && ctaEmail !== null && ctaEmail !== '') {
                console.log('ctaEmail: [' + ctaEmail + ']');
                usuariosToEdit.ctaEmail = ctaEmail;
            }
            if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
                console.log('estado[: ' + estado + ']');
                usuariosToEdit.estado = estado;
            }
            dataResponse = await this.repository.save(usuariosToEdit);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        return resp;
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let usuariosToRemove: Usuarios = new Usuarios();
        try {
            const id = parseInt(request.params.id);
            usuariosToRemove = await this.repository.findOneBy({ id });
            if (!usuariosToRemove) {
                //return "this Usuarios not exist";
                resp.code = '1';
                resp.data = new Usuarios();
                console.log('Usuarios not exist');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Usuarios = await this.repository.remove(usuariosToRemove);
            resp.data = null;
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

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        let resp: GenericResponse = new GenericResponse();
        console.log('method findByFilter');
        const { ctaUsr, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        ctaUsr: ctaUsr ? Like('%' + ctaUsr + '%') : null,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: pageSize,
                }
            );
            resp.data = {
                totalReg,
                nextPage: pageSize + 1,
                previousPage: pageSize,
                results,
            };
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

}