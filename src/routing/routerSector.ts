import { SectorController } from "../controller/SectorController";

export const RoutesSector = [
    {
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
];