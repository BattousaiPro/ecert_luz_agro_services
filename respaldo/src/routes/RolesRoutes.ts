//import { checkPermisos } from '../middlewares/permisos';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { RolesController } from '../controller/RolesController';

const roles = Router();

roles.get('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_ROL'])]
    , RolesController.getAll);

roles.post('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_ROL_CREATE'])]
    , RolesController.new);

roles.patch('/:id'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_ROL_EDIT'])]
    , RolesController.edit);

roles.delete('/:id'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_ROL_DELETE'])]
    , RolesController.delete);

roles.post('/findByFilter'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_ROL'])]
    , RolesController.findByFilter);

export default roles;
