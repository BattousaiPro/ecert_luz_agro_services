import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { GenericResponse } from "../vo/GenericResponse";
import { UsuariosVO } from "../vo/UsuariosVO";
import { Usuarios } from "../entity/Usuarios";

export class AuthController {

    private repository = AppDataSource.getRepository(Usuarios);

    constructor() { }

    async login(request: Request, response: Response) {
        // console.log('method login');
        let resp: GenericResponse = new GenericResponse();
        const { ctaUserName, ctaPassWord } = request.body;
        if (!(ctaUserName && ctaPassWord)) {
            //console.log(JSON.stringify(e));
            resp.code = '-1';
            resp.message = 'Nombre de Usuario y contraseña son requeridos!';
            resp.data = null;
            return resp;
        }

        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail({ where: { ctaUserName } });
        } catch (e) {
            //console.log(JSON.stringify(e));
            resp.code = '-2';
            resp.message = 'Nombre de Usuario o contraseña son incorrectos!';
            resp.data = null;
            return resp;
        }

        // Check password
        /*
        if (!user.checkPassword(ctaPassWord)) {
            resp.code = '-3';
            resp.message = 'Nombre de Usuario o contraseña son incorrectos!';
            resp.data = null;
            return resp;
        }

        const token: string = jwt.sign({ userId: user.id, username: user.ctaUserName }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'OK', token, userId: user.id, role: user.role });
        */

        resp.data = this.convertToVO(user);
        return resp;
    }

    async changePassword(request: Request, response: Response) {
        // console.log('method changePassword');
        let resp: GenericResponse = new GenericResponse();
        const { userId } = response.locals.jwtPayload;
        const { oldPassword, newPassword } = request.body;

        if (!(oldPassword && newPassword)) {
            resp.code = '-1';
            resp.data = null;
            console.log('Antigua contraseña & nueva contraseña Son requeridas');
            return resp;
        }

        let user: Usuarios;
        try {
            user = await this.repository.findOneOrFail({ where: { id: userId } });
        } catch (e) {
            resp.code = '-2';
            resp.data = null;
            console.log('Algo salio mal');
            return resp;
        }

        /*
        if (!user.checkPassword(oldPassword)) {
            resp.code = '-3';
            resp.data = null;
            resp.message = 'Comprueba tu antigua contrasña';
            console.log('Comprueba tu antigua contrasña');
            return res.status(401).json({ message: 'Check your old Password' });
        }
        */

        return resp;
    }

    private convertToVO(inputUser: Usuarios): UsuariosVO {
        let itemUser: UsuariosVO = new UsuariosVO();
        itemUser = new UsuariosVO();
        itemUser.id = inputUser.id;
        itemUser.ctaUserName = inputUser.ctaUserName;
        itemUser.ctaEmail = inputUser.ctaEmail;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}
export default AuthController;