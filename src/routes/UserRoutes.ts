//import { checkRole } from './../middlewares/role';
//import { checkJwt } from './../middlewares/jwt';
import { Router } from 'express';
import { UserController } from '../controller/UserController';
import { checkJwt } from '../middlewares/jwt';

const users = Router();

users.post('/'
    //, [checkJwt
    //    ,checkRole(['admin'])
    //]
    , UserController.new);

users.patch('/:id'
    //, [checkJwt, checkRole(['admin'])]
    , UserController.edit);

users.delete('/:id'
    //, [checkJwt, checkRole(['admin'])]
    , UserController.delete);

users.post('/findByFilter'
    //, [checkJwt, checkRole(['admin'])]
    , UserController.findByFilter);

export default users;
