//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { PermisosController } from '../controller/PermisosController';

const permisos = Router();

permisos.get('/', PermisosController.getAll);

permisos.post('/'
    //, [checkJwt, checkRole(['admin'])]
    , PermisosController.new);

permisos.patch('/:id'
    //, [checkJwt, checkRole(['admin'])]
    , PermisosController.edit);

permisos.delete('/:id'
    //, [checkJwt, checkRole(['admin'])]
    , PermisosController.delete);

permisos.post('/findByFilter'
    //, [checkJwt, checkRole(['admin'])]
    , PermisosController.findByFilter);

export default permisos;
