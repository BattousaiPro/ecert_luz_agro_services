import { RoutesComunas } from "./routing/routerComunas";
import { RoutesPermisos } from "./routing/routerPermisos";
import { RoutesRoles } from "./routing/routerRoles";
import { RoutesSector } from "./routing/routerSector";
import { RoutesKapmae } from "./routing/routerKapmae";

export const Routes: any[] = [
    ...RoutesSector,
    ...RoutesComunas,
    ...RoutesPermisos,
    ...RoutesRoles,
    ...RoutesSector,
    ...RoutesKapmae,
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