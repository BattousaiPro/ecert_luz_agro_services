import { Request, Response } from "express";
import { GenericResponse, StatusCode } from "../vo/GenericResponse";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";
import { UsuariosVO } from "../vo/UsuariosVO";
import { RolesVO } from "../vo/RolesVO";
import { Usuarios } from "../entity/Usuarios";
import { Roles } from "../entity/Roles";

export class UserController {

    private static repository = AppDataSource.getRepository(Usuarios);

    constructor() { }

    static getById = async (request: Request, response: Response) => {
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
        return response.send(resp);
    }

    static new = async (request: Request, response: Response) => {
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
                    return response.status(200).send(resp);
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return response.status(200).send(resp);
            }

            try {
                const newElement = Object.assign(new Usuarios(), {
                    ctaUserName, ctaPassWord, ctaEmail, estado: true
                });
                newElement.hashPassword();
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
        return response.send(resp);
    }

    static edit = async (request: Request, response: Response) => {
        // console.log('method edit');
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
                return response.status(200).send(resp);
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return response.status(200).send(resp);
        }

        try {
            elementToEdit = this.getObjectEdit(request, elementToEdit);
            dataResponse = await this.repository.save(elementToEdit);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.send(resp);
    }

    static delete = async (request: Request, response: Response) => {
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
                return response.status(200).send(resp);
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Usuario';
            resp.data = null;
            return response.status(200).send(resp);
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
        return response.send(resp);
    }

    static findByFilter = async (request: Request, response: Response) => {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { ctaUserName, ctaEmail, limit, pageSize } = request.body;
        try {
            const [resultsReg, totalReg] = await this.repository.findAndCount(
                {
                    take: limit,
                    skip: pageSize,
                    relations: { roles: true },
                    where: {
                        ctaUserName: ctaUserName ? Like('%' + ctaUserName + '%') : null,
                        ctaEmail: ctaEmail ? Like('%' + ctaEmail + '%') : null,
                    },
                    order: { id: "DESC" },
                }
            );
            let results = this.convertToVOs(resultsReg);
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
        return response.send(resp);
    }

    private static convertToVOs(inputUser: Usuarios[]): UsuariosVO[] {
        let salidaUser: UsuariosVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private static convertToVO(inputUser: Usuarios): UsuariosVO {
        let itemUser: UsuariosVO = new UsuariosVO();
        itemUser = new UsuariosVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUserName = inputUser.ctaUserName;
        //itemUser.ctaPassWord = inputUser.ctaPassWord;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        let rols: RolesVO[] = this.convertToRolVOs(inputUser.roles);
        itemUser.roles = [];
        itemUser.roles.push(...rols);
        return itemUser;
    }

    private static convertToRolVOs(input: Roles[]): RolesVO[] {
        let salida: RolesVO[] = [];
        if (input) {
            for (let index = 0; index < input.length; index++) {
                salida.push(this.convertToRolVO(input[index]));
            }
        }
        return salida;
    }

    private static convertToRolVO(input: Roles): RolesVO {
        let item: RolesVO = new RolesVO();
        item = new RolesVO();
        item.id = input.id;
        item.name = input.name;
        item.descrip = input.descrip;
        item.code = input.code;
        item.estado = input.estado;
        return item;
    }

    private static getObjectEdit(request: Request, elementToEdit: Usuarios): Usuarios {
        const { ctaUserName, ctaPassWord, ctaEmail, estado } = request.body;
        if (typeof ctaUserName !== 'undefined' && ctaUserName !== null && ctaUserName !== '') {
            console.log('ctaUserName: [' + ctaUserName + ']');
            elementToEdit.ctaUserName = ctaUserName;
        }
        if (typeof ctaEmail !== 'undefined' && ctaEmail !== null && ctaEmail !== '') {
            console.log('ctaEmail: [' + ctaEmail + ']');
            elementToEdit.ctaEmail = ctaEmail;
        }
        if (typeof ctaPassWord !== 'undefined' && ctaPassWord !== null && ctaPassWord !== '') {
            console.log('ctaPassWord: [' + ctaPassWord + ']');
            elementToEdit.ctaPassWord = ctaPassWord;
            elementToEdit.hashPassword();
        }
        if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}