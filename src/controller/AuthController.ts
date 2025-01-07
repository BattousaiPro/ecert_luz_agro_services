import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { GenericResponse } from "../vo/GenericResponse";
import { UsuariosVO } from "../vo/UsuariosVO";
import { Usuarios } from "../entity/Usuarios";
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import { UserAuthVO } from "../vo/UserAuthVO";
import config from "../config/config";
import { Roles } from "../entity/Roles";

export class AuthController {

    private static repository = AppDataSource.getRepository(Usuarios);

    constructor() { }

    static login = async (request: Request, response: Response) => {
        // console.log('method login: ' + new Date().toLocaleString().split(', ')[1]);
        let resp: GenericResponse = new GenericResponse();
        const { ctaUserName, ctaPassWord } = request.body;
        if (!(ctaUserName && ctaPassWord)) {
            //console.log(JSON.stringify(e));
            resp.code = '-1';
            resp.message = 'Nombre de Usuario y contraseña son requeridos!';
            resp.data = null;
            return response.status(200).send(resp);
        }

        // console.log('validaión user pass existe: ' + new Date().toLocaleString().split(', ')[1]);
        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail({
                where: { ctaUserName },
                relations: {
                    roles: {
                        permisos: true,
                    }
                }
            });
        } catch (e) {
            //console.log(JSON.stringify(e));
            resp.code = '-2';
            resp.message = 'Nombre de Usuario o contraseña son incorrectos!';
            resp.data = null;
            return response.status(200).send(resp);
        }
        // console.log('encontrar user exitente: ' + new Date().toLocaleString().split(', ')[1]);

/*
        // Check password
        if (!user.checkPassword(ctaPassWord)) {
            resp.code = '-3';
            resp.message = 'Nombre de Usuario o contraseña son incorrectos!';
            resp.data = null;
            return response.status(200).send(resp);
        }
*/

        // console.log('chequeo encript pass: ' + new Date().toLocaleString().split(', ')[1]);
        const token: string = jwt.sign({ userId: user.id, username: user.ctaUserName }, config.jwtSecret, { expiresIn: '1h' });
        // console.log('generate Toekb jwt: ' + new Date().toLocaleString().split(', ')[1]);

        resp.data = this.setUserAuthVO(token, user.roles);
        // console.log('mapper user VO: ' + new Date().toLocaleString().split(', ')[1]);
        return response.send(resp);
    }

    static changePassword = async (request: Request, response: Response) => {
        // console.log('method changePassword');
        let resp: GenericResponse = new GenericResponse();
        const { userId } = response.locals.jwtPayload;
        const { oldPassword, newPassword } = request.body;

        if (!(oldPassword && newPassword)) {
            resp.code = '-1';
            resp.data = null;
            console.log('Antigua contraseña & nueva contraseña Son requeridas');
            return response.status(200).send(resp);
        }

        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail({ where: { id: userId } });
        } catch (e) {
            resp.code = '-2';
            resp.data = null;
            console.log('Algo salio mal');
            return response.status(200).send(resp);
        }

        if (!user.checkPassword(oldPassword)) {
            resp.code = '-3';
            resp.data = null;
            resp.message = 'Comprueba tu antigua contrasña';
            console.log('Comprueba tu antigua contrasña');
            return response.status(200).send(resp);
        }

        user.ctaPassWord = newPassword;
        const validationOps = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOps);

        if (errors.length > 0) {
            resp.code = '-1';
            resp.data = errors;
            return response.status(200).send(resp);
        }

        // Hash password
        user.hashPassword();
        this.repository.save(user);
        resp.message = 'Contraseña Guardada'
        return response.send(resp);
    }

    private static convertToVO(inputUser: Usuarios): UsuariosVO {
        let itemUser: UsuariosVO = new UsuariosVO();
        itemUser = new UsuariosVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUserName = inputUser.ctaUserName;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

    private static setUserAuthVO(token: string, roles: Roles[]): UserAuthVO {
        let userResp: UserAuthVO = new UserAuthVO();
        userResp.token = token;
        userResp.permisos = this.obtenerPermisosByRol(roles);
        return userResp;
    }

    private static obtenerPermisosByRol(roles: Roles[]): string[] {
        let perResp: string[] = [];
        for (let index = 0; index < roles.length; index++) {
            for (let indexh = 0; indexh < roles[index].permisos.length; indexh++) {
                const element = roles[index].permisos[indexh];
                perResp.push(element.code);
            }
        }
        let result: string[] = perResp.filter((item, index) => {
            return perResp.indexOf(item) === index;
        })
        result.sort();
        return result;
    }

}
export default AuthController;