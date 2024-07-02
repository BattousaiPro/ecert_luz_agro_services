//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import AuthController from '../controller/AuthController';

const auth = Router();

auth.post('/login'
    //, [checkJwt, checkRole(['admin'])]
    , AuthController.login);

auth.post('/changePassword'
    //, [checkJwt, checkRole(['admin'])]
    , AuthController.changePassword);

export default auth;
