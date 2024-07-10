//import { checkPermisos } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const auth = Router();

auth.post('/login'
    //, [checkJwt, checkPermisos(['admin'])]
    , AuthController.login);

auth.post('/changePassword'
    //, [checkJwt, checkPermisos(['admin'])]
    , AuthController.changePassword);

export default auth;
