import AuthController from './modulos/auth/controller/AuthController';
import { ComunasController } from './modulos/comunas/controller/ComunasController';
import { FichaController } from './modulos/ficha/controller/FichaController';
import { KapmaeController } from './modulos/kapmae/controller/KapmaeController';
import { RolPermisoController } from './modulos/permiso-to-rol/controller/RolPermisoController';
import { PermisosController } from './modulos/permisos/controller/PermisosController';
import { UserRolController } from './modulos/rol-to-user/controller/UserRolController';
import { RolesController } from './modulos/roles/controller/RolesController';
import { SectorController } from './modulos/sector/controller/SectorController';
import { UserController } from './modulos/users/controller/UserController';

export const Routes: any[] = [




    /** Secctio Auth */
    {
        method: 'post',
        route: '/auth/login',
        controller: AuthController,
        action: 'login'
    }, {
        method: 'post',
        route: '/auth/changePassword',
        controller: AuthController,
        action: 'changePassword'
    },


    /** Secctio Ficha */
    {
        method: 'get',
        route: '/ficha/anios',
        controller: FichaController,
        action: 'getFindAnios'
    },



    /** Secctio Comunas */
    {
        method: 'get',
        route: '/comunas',
        controller: ComunasController,
        action: 'getAll'
    }, {
        method: 'post',
        route: '/comunas',
        controller: ComunasController,
        action: 'new'
    }, {
        method: 'patch',
        route: '/comunas/:codigo',
        controller: ComunasController,
        action: 'edit'
    }, {
        method: 'delete',
        route: '/comunas/:codigo',
        controller: ComunasController,
        action: 'delete'
    }, {
        method: 'post',
        route: '/comunas/findByFilter',
        controller: ComunasController,
        action: 'findByFilter'
    },




    /** Secctio Kapmae */
    {
        method: 'post',
        route: '/kapmae',
        controller: KapmaeController,
        action: 'new'
    }, {
        method: 'patch',
        route: '/kapmae/:id',
        controller: KapmaeController,
        action: 'edit'
    }, {
        method: 'post',
        route: '/kapmae/delete',
        controller: KapmaeController,
        action: 'delete'
    }, {
        method: 'post',
        route: '/kapmae/findByFilter',
        controller: KapmaeController,
        action: 'findByFilter'
    },




    /** Secctio Kapmae - Obtener Imagenes*/
    {
        method: 'get',
        route: '/kapmae/findImgByCodCop/:codCop',
        controller: KapmaeController,
        action: 'findImgByCodCop'
    },




    /** Secctio Permisos */
    {
        method: 'get',
        route: '/permisos',
        controller: PermisosController,
        action: 'getAll'
    }, {
        method: 'post',
        route: '/permisos',
        controller: PermisosController,
        action: 'new'
    }, {
        method: 'patch',
        route: '/permisos/:id',
        controller: PermisosController,
        action: 'edit'
    }, {
        method: 'delete',
        route: '/permisos/:id',
        controller: PermisosController,
        action: 'delete'
    }, {
        method: 'post',
        route: '/permisos/findByFilter',
        controller: PermisosController,
        action: 'findByFilter'
    },




    /** Secctio Roles */
    {
        method: 'get',
        route: '/roles',
        controller: RolesController,
        action: 'getAll'
    }, {
        method: 'post',
        route: '/roles',
        controller: RolesController,
        action: 'new'
    }, {
        method: 'patch',
        route: '/roles/:id',
        controller: RolesController,
        action: 'edit'
    }, {
        method: 'delete',
        route: '/roles/:id',
        controller: RolesController,
        action: 'delete'
    }, {
        method: 'post',
        route: '/roles/findByFilter',
        controller: RolesController,
        action: 'findByFilter'
    },




    /** Secctio Sector */
    {
        method: 'get',
        route: '/sector',
        controller: SectorController,
        action: 'getAll'
    }, {
        method: 'post',
        route: '/sector',
        controller: SectorController,
        action: 'new'
    }, {
        method: 'patch',
        route: '/sector/:codigo',
        controller: SectorController,
        action: 'edit'
    }, {
        method: 'delete',
        route: '/sector/:codigo',
        controller: SectorController,
        action: 'delete'
    }, {
        method: 'post',
        route: '/sector/findByFilter',
        controller: SectorController,
        action: 'findByFilter'
    },




    /** Secctio User */
    {
        method: 'post',
        route: '/users',
        controller: UserController,
        action: 'new'
    }, {
        method: 'patch',
        route: '/users/:id',
        controller: UserController,
        action: 'edit'
    }, {
        method: 'delete',
        route: '/users/:id',
        controller: UserController,
        action: 'delete'
    }, {
        method: 'post',
        route: '/users/findByFilter',
        controller: UserController,
        action: 'findByFilter'
    },




    /** Update Roles a los usuarios */
    {
        method: 'post',
        route: '/user-rol/:iduser',
        controller: UserRolController,
        action: 'userRol'
    },




    /** Update Permisos a los Roles */
    {
        method: 'post',
        route: '/rol-permiso/:idrol',
        controller: RolPermisoController,
        action: 'rolPermiso'
    },

];
