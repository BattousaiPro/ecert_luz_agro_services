//import { checkPermisos } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { RolPermisoController } from '../controller/RolPermisoController';

const rolpermiso = Router();

rolpermiso.post('/:idrol'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_ROL', 'LUZ_AGRO_MENU_PERMISO'])]
    , RolPermisoController.rolPermiso);

export default rolpermiso;
