import { ComunasController } from "../controller/ComunasController";

const basePath = '/comunas';

export const RoutesComunas = [
    {
        method: "get",
        route: basePath,
        controller: ComunasController,
        action: "all"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: ComunasController,
        action: "one"
    }, {
        method: "post",
        route: basePath,
        controller: ComunasController,
        action: "save"
    }, {
        method: "delete",
        route: basePath + "/:id",
        controller: ComunasController,
        action: "remove"
    }
];