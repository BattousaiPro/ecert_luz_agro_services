import { ComunasController } from "./controller/ComunasController"
import { PermisosController } from "./controller/PermisosController"
import { RolesController } from "./controller/RolesController"
import { SectorController } from "./controller/SectorController"
import { TipCteController } from "./controller/TipCteController"
import { UsuariosController } from "./controller/UsuariosController"

import { EjemploController } from "./controller/EjemploController"

export const Routes = [
    {
        method: "get",
        route: "/users",
        controller: UsuariosController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UsuariosController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UsuariosController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UsuariosController,
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



    , {
        method: "get",
        route: "/sector",
        controller: SectorController,
        action: "all"
    }, {
        method: "get",
        route: "/sector/:id",
        controller: SectorController,
        action: "one"
    }, {
        method: "post",
        route: "/sector",
        controller: SectorController,
        action: "save"
    }, {
        method: "delete",
        route: "/sector/:id",
        controller: SectorController,
        action: "remove"
    }



    , {
        method: "get",
        route: "/tipCte",
        controller: TipCteController,
        action: "all"
    }, {
        method: "get",
        route: "/tipCte/:id",
        controller: TipCteController,
        action: "one"
    }, {
        method: "post",
        route: "/tipCte",
        controller: TipCteController,
        action: "save"
    }, {
        method: "delete",
        route: "/tipCte/:id",
        controller: TipCteController,
        action: "remove"
    }






    , {
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




]