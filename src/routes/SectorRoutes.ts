//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { SectorController } from '../controller/SectorController';

const sector = Router();

sector.get('/', SectorController.getAll);

sector.post('/'
    //, [checkJwt, checkRole(['admin'])]
    , SectorController.new);

sector.patch('/:codigo'
    //, [checkJwt, checkRole(['admin'])]
    , SectorController.edit);

sector.delete('/:codigo'
    //, [checkJwt, checkRole(['admin'])]
    , SectorController.delete);

sector.post('/findByFilter'
    //, [checkJwt, checkRole(['admin'])]
    , SectorController.findByFilter);

export default sector;
