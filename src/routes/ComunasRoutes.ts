//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { ComunasController } from '../controller/ComunasController';

const comunas = Router();

comunas.get('/', ComunasController.getAll);

comunas.post('/'
    //, [checkJwt, checkRole(['admin'])]
    , ComunasController.new);

comunas.patch('/:codigo'
    //, [checkJwt, checkRole(['admin'])]
    , ComunasController.edit);

comunas.delete('/:codigo'
    //, [checkJwt, checkRole(['admin'])]
    , ComunasController.delete);

comunas.post('/findByFilter'
    //, [checkJwt, checkRole(['admin'])]
    , ComunasController.findByFilter);

export default comunas;
