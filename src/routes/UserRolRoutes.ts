//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { UserRolController } from '../controller/UserRolController';

const userrol = Router();

userrol.post('/:iduser'
    //, [checkJwt, checkRole(['admin'])]
    , UserRolController.userRol);

export default userrol;
