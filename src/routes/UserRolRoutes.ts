import { checkPermisos } from '../middlewares/permisos';
import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { UserRolController } from '../controller/UserRolController';

const userrol = Router();

userrol.post('/:iduser'
    , [checkJwt, checkPermisos(['LUZ_AGRO_MENU_USUARIO', 'LUZ_AGRO_MENU_ROL'])]
    , UserRolController.userRol);

export default userrol;
