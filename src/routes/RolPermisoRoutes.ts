//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { RolPermisoController } from '../controller/RolPermisoController';

const rolpermiso = Router();

rolpermiso.post('/:idrol'
    //, [checkJwt, checkRole(['admin'])]
    , RolPermisoController.rolPermiso);

export default rolpermiso;
