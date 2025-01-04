import { Router } from 'express';

import comunas from './routes/ComunasRoutes';
import ficha from './routes/FichaRoutes';
import kapmae from './routes/KapmaeRoutes';
import permisos from './routes/PermisosRoutes';
import roles from './routes/RolesRoutes';
import rolpermiso from './routes/RolPermisoRoutes';
import sector from './routes/SectorRoutes';
import userrol from './routes/UserRolRoutes';
import users from './routes/UserRoutes';
import auth from './routes/AuthRoutes';

const routes = Router();

routes.use('/auth', auth);
routes.use('/comuna', comunas);
routes.use('/ficha', ficha);
routes.use('/kapmae', kapmae);
routes.use('/permiso', permisos);
routes.use('/rol', roles);
routes.use('/rol-permiso', rolpermiso);
routes.use('/sector', sector);
routes.use('/user-rol', userrol);
routes.use('/user', users);

export default routes;
