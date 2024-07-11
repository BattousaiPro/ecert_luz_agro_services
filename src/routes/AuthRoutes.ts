import { Router } from 'express';
import AuthController from '../controller/AuthController';

const auth = Router();

auth.post('/login'
    , AuthController.login);

auth.post('/changePassword'
    , AuthController.changePassword);

export default auth;
