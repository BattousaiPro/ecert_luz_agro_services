//import { checkPermisos } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { FichaController } from '../controller/FichaController';

const ficha = Router();

ficha.get('/anios'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_FICHA'])]
    , FichaController.getFindAnios);

export default ficha;
