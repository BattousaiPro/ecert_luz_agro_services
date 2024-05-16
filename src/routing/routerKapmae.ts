import { KapmaeController } from "../controller/KapmaeController";

export const RoutesKapmae = [
    {
        method: "get",
        route: "/kapmae",
        controller: KapmaeController,
        action: "all"
    }, {
        method: "get",
        route: "/kapmae/:id",
        controller: KapmaeController,
        action: "one"
    }, {
        method: "post",
        route: "/kapmae",
        controller: KapmaeController,
        action: "save"
    }, {
        method: "delete",
        route: "/kapmae/:id",
        controller: KapmaeController,
        action: "remove"
    }
];