//import { checkPermisos } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { KapmaeController } from '../controller/KapmaeController';

const kapmae = Router();

kapmae.post('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SOCIO_CREATE'])]
    , KapmaeController.new);

kapmae.patch('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SOCIO_EDIT'])]
    , KapmaeController.edit);

kapmae.post('/delete'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SOCIO_DELETE'])]
    , KapmaeController.delete);

kapmae.post('/findByFilter'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_SOCIO'])]
    , KapmaeController.findByFilter);

kapmae.get('/findImgByCodCop/:codCop'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SOCIO_BUSCAR_IMG_COD'])]
    , KapmaeController.findImgByCodCop);

export default kapmae;
