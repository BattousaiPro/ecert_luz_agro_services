import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Usuarios } from "../entities/Usuarios";
import { UsuariosVO } from "../dto/UsuariosVO";
import { Like } from "typeorm";

export class UserController {

    private repository = AppDataSource.getRepository(Usuarios);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['id', 'ctaUserName', 'ctaPassWord', 'ctaEmail', 'estado']
            });
        } catch (ex) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Somenthing goes wrong!';
            resp.data = null;
            return resp;
        }
        if (dataResponse.length === 0) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Not result';
            resp.data = null;
            return resp;
        }
        resp.data = this.convertToVOs(dataResponse);
        return resp;
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
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
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios = new Usuarios();
        let usuariosToNew: Usuarios = new Usuarios();
        const { ctaUserName, ctaPassWord, ctaEmail } = request.body;
        try {
            usuariosToNew = await this.repository.findOneBy({ ctaUserName });
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
            usuarios.ctaUserName = ctaUserName;
            usuarios.ctaPassWord = ctaPassWord;
            usuarios.ctaEmail = ctaEmail;
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
            const { ctaUserName, ctaEmail, estado } = request.body;
            if (typeof ctaUserName !== 'undefined' && ctaUserName !== null && ctaUserName !== '') {
                console.log('ctaUserName[: ' + ctaUserName + ']');
                usuariosToEdit.ctaUserName = ctaUserName;
            }
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
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let userToRemove: Usuarios = new Usuarios();
        try {
            const id = parseInt(request.params.id);
            userToRemove = await this.repository.findOneBy({ id });
            if (!userToRemove) {
                resp.code = '1';
                resp.data = new Usuarios();
                resp.message = StatusCode.ERROR + ': Usuario no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Usuario';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Usuarios = await this.repository.remove(userToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { ctaUserName, ctaEmail, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        ctaUserName: ctaUserName ? Like(ctaUserName + '%') : null,
                        ctaEmail: ctaEmail ? Like(ctaEmail + '%') : null,
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

    private convertToVOs(inputUser: Usuarios[]): UsuariosVO[] {
        let salidaUser: UsuariosVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Usuarios): UsuariosVO {
        let itemUser: UsuariosVO = new UsuariosVO();
        itemUser = new UsuariosVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUserName = inputUser.ctaUserName;
        itemUser.ctaPassWord = inputUser.ctaPassWord;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}