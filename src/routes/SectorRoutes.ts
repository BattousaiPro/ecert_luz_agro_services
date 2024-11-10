//import { checkPermisos } from '../middlewares/permisos';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { SectorController } from '../controller/SectorController';

const sector = Router();

sector.get('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_SECTOR'])]
    , SectorController.getAll);

sector.post('/'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SECTOR_CREATE'])]
    , SectorController.new);

sector.patch('/:codigo'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SECTOR_EDIT'])]
    , SectorController.edit);

sector.delete('/:codigo'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_SECTOR_DELETE'])]
    , SectorController.delete);

sector.post('/findByFilter'
    //, [checkJwt, checkPermisos(['LUZ_AGRO_MENU_SECTOR'])]
    , SectorController.findByFilter);

export default sector;
