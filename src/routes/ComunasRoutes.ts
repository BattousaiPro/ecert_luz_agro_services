//import { checkPermisos } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { ComunasController } from '../controller/ComunasController';

const comunas = Router();

comunas.get('/',
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_COMUNA'])]
    ComunasController.getAll);

comunas.post('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_COMUNA_CREATE'])]
    , ComunasController.new);

comunas.patch('/:codigo'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_COMUNA_EDIT'])]
    , ComunasController.edit);

comunas.delete('/:codigo'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_COMUNA_DELETE'])]
    , ComunasController.delete);

comunas.post('/findByFilter'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_COMUNA'])]
    , ComunasController.findByFilter);

export default comunas;
