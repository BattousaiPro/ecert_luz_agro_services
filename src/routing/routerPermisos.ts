import { PermisosController } from "../controller/PermisosController";

const basePath = '/permisos';

export const RoutesPermisos = [
    {
        method: "get",
        route: basePath,
        controller: PermisosController,
        action: "all"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: PermisosController,
        action: "one"
    }, {
        method: "post",
        route: basePath,
        controller: PermisosController,
        action: "save"
    }, {
        method: "delete",
        route: basePath + "/:id",
        controller: PermisosController,
        action: "remove"
    }
];