//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { KapmaeController } from '../controller/KapmaeController';

const kapmae = Router();

kapmae.post('/'
    //, [checkJwt, checkRole(['admin'])]
    , KapmaeController.new);

kapmae.patch('/'
    //, [checkJwt, checkRole(['admin'])]
    , KapmaeController.edit);

kapmae.post('/delete'
    //, [checkJwt, checkRole(['admin'])]
    , KapmaeController.delete);

kapmae.post('/findByFilter'
    //, [checkJwt, checkRole(['admin'])]
    , KapmaeController.findByFilter);

kapmae.get('/findImgByCodCop/:codCop'
    //, [checkJwt, checkRole(['admin'])]
    , KapmaeController.findImgByCodCop);

export default kapmae;
