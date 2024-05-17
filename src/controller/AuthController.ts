import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Comunas } from "../entity/Comunas";
import { GenericResponse, StatusCode } from "./model/GenericResponse";

import { getRepository } from 'typeorm';
import { Usuarios } from "../entity/Usuarios";
//import { Request, Response } from 'express';
//import { Users } from '../entity/Users';
//import * as jwt from 'jsonwebtoken';
//import config from '../config/config';
//import { validate } from 'class-validator';

export class AuthController {

    private static repository = AppDataSource.getRepository(Usuarios);

    static login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    //static login = async (req: Request, res: Response) => {
        const { ctaUsr, ctaPass } = req.body;

        if (!(ctaUsr && ctaPass)) {
            return res.status(400).json({ message: ' Username & Password are required!' });
        }

        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail({ where: { ctaUsr: ctaUsr, ctaPass: ctaPass } });
        } catch (e) {
            return res.status(400).json({ message: ' Username or password incorecct!' });
        }

        // Check password
        /*
        if (!user.checkPassword(ctaPass)) {
            return res.status(400).json({ message: 'Username or Password are incorrect!' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, config.jwtSecret, { expiresIn: '1h' });

        res.json({ message: 'OK', token, userId: user.id, role: user.role });
*/
        res.send(user);

    }

    static changePassword = async (req: Request, res: Response) => {
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
    }

}
export default AuthController;