import { ComunasController } from "../controller/ComunasController";

export const RoutesComunas = [
    {
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
];