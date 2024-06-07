import { NextFunction, Request, Response } from "express";
import { GenericResponse } from "../../../vo/GenericResponse";
import { AuthServices } from "../services/AuthServices";
//import { Request, Response } from 'express';
//import { Users } from '../entity/Users';
//import * as jwt from 'jsonwebtoken';
//import config from '../config/config';
//import { validate } from 'class-validator';

export class AuthController {

    constructor(private authServices: AuthServices) { }

    async login(req: Request, res: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method login');
        return await this.authServices.login(req);
    }

    async changePassword(req: Request, res: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method changePassword');
        return await this.authServices.changePassword(req, res);
    }

}
export default AuthController;