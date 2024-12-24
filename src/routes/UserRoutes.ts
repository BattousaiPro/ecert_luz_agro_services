import { checkPermisos } from '../middlewares/permisos';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';

const users = Router();

users.post('/'
    , [checkJwt, checkPermisos(['LUZ_AGRO_USER_CREATE'])]
    , UserController.new);

users.patch('/:id'
    , [checkJwt, checkPermisos(['LUZ_AGRO_USER_EDIT'])]
    , UserController.edit);

users.delete('/:id'
    , [checkJwt, checkPermisos(['LUZ_AGRO_USER_DELETE'])]
    , UserController.delete);

users.post('/findByFilter'
    , [checkJwt, checkPermisos(['LUZ_AGRO_MENU_USUARIO'])]
    , UserController.findByFilter);

export default users;
