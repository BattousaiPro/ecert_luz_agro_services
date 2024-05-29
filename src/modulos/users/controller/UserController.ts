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
                select: ['id', 'ctaUserName', 'ctaEmail', 'estado']
            });
        } catch (ex) {
            resp.code = '-2';
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
        resp.data = this.convertToVOs(dataResponse, false);
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
                resp.code = '-2';
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
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Usuarios = new Usuarios();
        try {
            const {
                ctaUserName, ctaPassWord, ctaEmail
            } = request.body;
            try {
                let toNew: Usuarios = await this.repository.findOneBy({
                    ctaUserName
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Usuario ya existe';
                    return resp;
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return resp;
            }

            try {
                const newElement = Object.assign(new Usuarios(), {
                    ctaUserName, ctaPassWord, ctaEmail, estado: true
                });
                dataResponse = await this.repository.save(newElement);
                resp.data = dataResponse.id;
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
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
        let elementToEdit: Usuarios = new Usuarios();
        try {
            const id = parseInt(request.params.id);
            elementToEdit = await this.repository.findOneBy({ id });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Usuarios();
                console.log('Usuarios no existe');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const { ctaUserName, ctaEmail, estado } = request.body;
            if (typeof ctaUserName !== 'undefined' && ctaUserName !== null && ctaUserName !== '') {
                console.log('ctaUserName: [' + ctaUserName + ']');
                elementToEdit.ctaUserName = ctaUserName;
            }
            if (typeof ctaEmail !== 'undefined' && ctaEmail !== null && ctaEmail !== '') {
                console.log('ctaEmail: [' + ctaEmail + ']');
                elementToEdit.ctaEmail = ctaEmail;
            }
            if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
                console.log('estado: [' + estado + ']');
                elementToEdit.estado = estado;
            }
            dataResponse = await this.repository.save(elementToEdit);
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
                resp.code = '-3';
                resp.data = new Usuarios();
                resp.message = StatusCode.ERROR + ': Usuario no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-2';
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
            const [uerList, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        ctaUserName: ctaUserName ? Like('%' + ctaUserName + '%') : null,
                        ctaEmail: ctaEmail ? Like('%' + ctaEmail + '%') : null,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: (pageSize - 1) * limit
                }
            );
            const results: UsuariosVO[] = this.convertToVOs(uerList, false);
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

    private convertToVOs(inputUser: Usuarios[], showPass: boolean): UsuariosVO[] {
        let salidaUser: UsuariosVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index], showPass));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Usuarios, showPass: boolean): UsuariosVO {
        let itemUser: UsuariosVO = new UsuariosVO();
        itemUser = new UsuariosVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUserName = inputUser.ctaUserName;
        if (showPass) {
            itemUser.ctaPassWord = inputUser.ctaPassWord;
        }
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}