import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { Comunas } from "../../comunas/entities/Comunas";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";

import { getRepository } from 'typeorm';
import { Usuarios } from "../../users/entities/Usuarios";
import { UsuariosVO } from "../../../vo/UsuariosVO";
//import { Request, Response } from 'express';
//import { Users } from '../entity/Users';
//import * as jwt from 'jsonwebtoken';
//import config from '../config/config';
//import { validate } from 'class-validator';

export class AuthController {

    private repository = AppDataSource.getRepository(Usuarios);


    async login(req: Request, res: Response, next: NextFunction): Promise<GenericResponse> {
        let resp: GenericResponse = new GenericResponse();
        const { ctaUsr, ctaPass } = req.body;
        if (!(ctaUsr && ctaPass)) {
            //return res.status(400).json({ message: ' Username & Password are required!' });
            resp.code = '1';
            resp.data = new Usuarios();
            console.log('Username & Password are required!');
            return resp;
        }

        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail({ where: { ctaUsr: ctaUsr, ctaPass: ctaPass } });
            resp.data = user;
            resp.data = this.convertToVO(user);
        } catch (e) {
            //return res.status(400).json({ message: ' Username or password incorecct!' });
            console.log(JSON.stringify(e));
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ' Username or password incorecct!';
            resp.data = null;
        }

        // Check password
        /*
        if (!user.checkPassword(ctaPass)) {
            return res.status(400).json({ message: 'Username or Password are incorrect!' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

        res.json({ message: 'OK', token, userId: user.id, role: user.role });
*/
        //res.send(user);
        return resp;
    }

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<GenericResponse> {
        let resp: GenericResponse = new GenericResponse();
        const { userId } = res.locals.jwtPayload;
        const { oldPassword, newPassword } = req.body;

        if (!(oldPassword && newPassword)) {
            res.status(400).json({ message: 'Old password & new password are required' });
        }

        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail(userId);
        } catch (e) {
            res.status(400).json({ message: 'Somenthing goes wrong!' });
        }
        /*
        if (!user.checkPassword(oldPassword)) {
            return res.status(401).json({ message: 'Check your old Password' });
        }
        */
        return resp;
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
export default AuthController;