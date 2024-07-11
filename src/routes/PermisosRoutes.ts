//import { checkPermisos } from '../middlewares/permisos';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { PermisosController } from '../controller/PermisosController';

const permisos = Router();

permisos.get('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_PERMISO'])]
    , PermisosController.getAll);

permisos.post('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_PERMISO_CREATE'])]
    , PermisosController.new);

permisos.patch('/:id'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_PERMISO_EDIT'])]
    , PermisosController.edit);

permisos.delete('/:id'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_PERMISO_DELETE'])]
    , PermisosController.delete);

permisos.post('/findByFilter'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_PERMISO'])]
    , PermisosController.findByFilter);

export default permisos;
