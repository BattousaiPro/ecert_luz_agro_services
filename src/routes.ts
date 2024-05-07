import { ComunasController } from "./controller/ComunasController"
import { PermisosController } from "./controller/PermisosController"
import { RolesController } from "./controller/RolesController"
import { UserController } from "./controller/UserController"

export const Routes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    }




    , {
        method: "get",
        route: "/roles",
        controller: RolesController,
        action: "all"
    }, {
        method: "get",
        route: "/roles/:id",
        controller: RolesController,
        action: "one"
    }, {
        method: "post",
        route: "/roles",
        controller: RolesController,
        action: "save"
    }, {
        method: "delete",
        route: "/roles/:id",
        controller: RolesController,
        action: "remove"
    }




    , {
        method: "get",
        route: "/permisos",
        controller: PermisosController,
        action: "all"
    }, {
        method: "get",
        route: "/permisos/:id",
        controller: PermisosController,
        action: "one"
    }, {
        method: "post",
        route: "/permisos",
        controller: PermisosController,
        action: "save"
    }, {
        method: "delete",
        route: "/permisos/:id",
        controller: PermisosController,
        action: "remove"
    }




    , {
        method: "get",
        route: "/comunas",
        controller: ComunasController,
        action: "all"
    }, {
        method: "get",
        route: "/comunas/:id",
        controller: ComunasController,
        action: "one"
    }, {
        method: "post",
        route: "/comunas",
        controller: ComunasController,
        action: "save"
    }, {
        method: "delete",
        route: "/comunas/:id",
        controller: ComunasController,
        action: "remove"
    }




]