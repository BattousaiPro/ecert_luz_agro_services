//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { FichaController } from '../controller/FichaController';

const ficha = Router();

ficha.get('/anios'
    //, [checkJwt, checkRole(['admin'])]
    , FichaController.getFindAnios);

export default ficha;
