import { PermisosController } from "../controller/PermisosController";

export const RoutesPermisos = [
    {
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
];