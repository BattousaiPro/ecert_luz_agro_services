//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { RolesController } from '../controller/RolesController';

const roles = Router();

roles.get('/', RolesController.getAll);

roles.post('/'
    //, [checkJwt, checkRole(['admin'])]
    , RolesController.new);

roles.patch('/:id'
    //, [checkJwt, checkRole(['admin'])]
    , RolesController.edit);

roles.delete('/:id'
    //, [checkJwt, checkRole(['admin'])]
    , RolesController.delete);

roles.post('/findByFilter'
    //, [checkJwt, checkRole(['admin'])]
    , RolesController.findByFilter);

export default roles;
