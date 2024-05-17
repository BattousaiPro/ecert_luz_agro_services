import { KapmaeController } from "../controller/KapmaeController";

const basePath = '/kapmae';

export const RoutesKapmae = [
    {
        method: "get",
        route: basePath,
        controller: KapmaeController,
        action: "all"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: KapmaeController,
        action: "one"
    }, {
        method: "post",
        route: basePath,
        controller: KapmaeController,
        action: "save"
    }, {
        method: "delete",
        route: basePath + "/:id",
        controller: KapmaeController,
        action: "remove"
    }
];