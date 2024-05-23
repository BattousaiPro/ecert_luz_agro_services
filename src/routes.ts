import { EjemploController } from "./modulos/ejemplo/controller/EjemploController";

import AuthController from "./modulos/auth/controller/AuthController";
import { ComunasController } from "./modulos/comunas/controller/ComunasController";
import { KapmaeController } from "./modulos/kapmae/controller/KapmaeController";
import { PermisosController } from "./modulos/permisos/controller/PermisosController";
import { RolesController } from "./modulos/roles/controller/RolesController";
import { SectorController } from "./modulos/sector/controller/SectorController";
import { TipCteController } from "./modulos/tipCte/controller/TipCteController";
import { UserController } from "./modulos/users/controller/UserController";

export const Routes: any[] = [

    /** Secctio Auth */
    {
        method: 'post',
        route: '/auth/login',
        controller: AuthController,
        action: 'login'
    },


    /** Secctio Comunas */
    {
        method: 'get',
        route: '/comunas',
        controller: ComunasController,
        action: 'all'
    }, {
        method: 'get',
        route: '/comunas/:id',
        controller: ComunasController,
        action: 'one'
    }, {
        method: 'post',
        route: '/comunas',
        controller: ComunasController,
        action: 'save'
    }, {
        method: 'delete',
        route: '/comunas/:id',
        controller: ComunasController,
        action: 'remove'
    }, {
        method: 'post',
        route: '/comunas/findByFilter',
        controller: PermisosController,
        action: 'findByFilter'
    },


    /** Secctio Kapmae */
    {
        method: 'get',
        route: '/kapmae',
        controller: KapmaeController,
        action: 'all'
    }, {
        method: 'get',
        route: '/kapmae/:id',
        controller: KapmaeController,
        action: 'one'
    }, {
        method: 'post',
        route: '/kapmae',
        controller: KapmaeController,
        action: 'save'
    }, {
        method: 'delete',
        route: '/kapmae/:id',
        controller: KapmaeController,
        action: 'remove'
    }, {
        method: 'post',
        route: '/kapmae/findByFilter',
        controller: KapmaeController,
        action: 'findByFilter'
    },



    /** Secctio Permisos */
    {
        method: 'get',
        route: '/permisos',
        controller: PermisosController,
        action: 'all'
    }, {
        method: 'get',
        route: '/permisos/:id',
        controller: PermisosController,
        action: 'one'
    }, {
        method: 'post',
        route: '/permisos',
        controller: PermisosController,
        action: 'save'
    }, {
        method: 'patch',
        route: '/permisos/:id',
        controller: PermisosController,
        action: 'editPermisos'
    }, {
        method: 'delete',
        route: '/permisos/:id',
        controller: PermisosController,
        action: 'remove'
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
        action: 'all'
    }, {
        method: 'get',
        route: '/roles/:id',
        controller: RolesController,
        action: 'one'
    }, {
        method: 'post',
        route: '/roles',
        controller: RolesController,
        action: 'save'
    }, {
        method: 'patch',
        route: '/roles/:id',
        controller: RolesController,
        action: 'editRoles'
    }, {
        method: 'delete',
        route: '/roles/:id',
        controller: RolesController,
        action: 'remove'
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
        action: 'all'
    }, {
        method: 'get',
        route: '/sector/:id',
        controller: SectorController,
        action: 'one'
    }, {
        method: 'post',
        route: '/sector',
        controller: SectorController,
        action: 'save'
    }, {
        method: 'delete',
        route: '/sector/:id',
        controller: SectorController,
        action: 'remove'
    }, {
        method: 'post',
        route: '/sector/findByFilter',
        controller: SectorController,
        action: 'findByFilter'
    },



    /** Secctio TipCte */
    {
        method: 'get',
        route: '/tipCte',
        controller: TipCteController,
        action: 'all'
    }, {
        method: 'get',
        route: '/tipCte/:id',
        controller: TipCteController,
        action: 'one'
    }, {
        method: 'post',
        route: '/tipCte',
        controller: TipCteController,
        action: 'save'
    }, {
        method: 'delete',
        route: '/tipCte/:id',
        controller: TipCteController,
        action: 'remove'
    },




    /** Secctio User */
    {
        method: 'get',
        route: '/users',
        controller: UserController,
        action: 'getAll'
    }, {
        method: 'get',
        route: '/users/:id',
        controller: UserController,
        action: 'getById'
    }, {
        method: 'post',
        route: '/users',
        controller: UserController,
        action: 'newUser'
    }, {
        method: 'patch',
        route: '/users/:id',
        controller: UserController,
        action: 'editUser'
    }, {
        method: 'delete',
        route: '/users/:id',
        controller: UserController,
        action: 'deleteUser'
    }, {
        method: 'post',
        route: '/users/findByFilter',
        controller: UserController,
        action: 'findByFilter'
    },


    /** Secctio User */
    {
        method: "get",
        route: "/ejemplo",
        controller: EjemploController,
        action: "all"
    }, {
        method: "get",
        route: "/ejemplo/:id",
        controller: EjemploController,
        action: "one"
    }, {
        method: "post",
        route: "/ejemplo",
        controller: EjemploController,
        action: "save"
    }, {
        method: "delete",
        route: "/ejemplo/:id",
        controller: EjemploController,
        action: "remove"
    }





];
