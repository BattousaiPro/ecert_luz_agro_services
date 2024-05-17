import { RoutesComunas } from "./routing/routerComunas";
import { RoutesPermisos } from "./routing/routerPermisos";
import { RoutesRoles } from "./routing/routerRoles";
import { RoutesSector } from "./routing/routerSector";
import { RoutesKapmae } from "./routing/routerKapmae";
import { RoutesAuth } from "./routing/routerAuth";
import { RoutesTipCte } from "./routing/routerTipCte";
import { RoutesUser } from "./routing/routerUser";

export const Routes: any[] = [
    ...RoutesAuth,
    ...RoutesComunas,
    ...RoutesKapmae,
    ...RoutesPermisos,
    ...RoutesRoles,
    ...RoutesSector,
    ...RoutesTipCte,
    ...RoutesUser,
];

/*
import { EjemploController } from "./controller/EjemploController"

export const Routes = [
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
]
*/