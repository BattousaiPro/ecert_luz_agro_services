import { SectorController } from "../controller/SectorController";

const basePath = '/sector';

export const RoutesSector = [
    {
        method: "get",
        route: basePath,
        controller: SectorController,
        action: "all"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: SectorController,
        action: "one"
    }, {
        method: "post",
        route: basePath,
        controller: SectorController,
        action: "save"
    }, {
        method: "delete",
        route: basePath + "/:id",
        controller: SectorController,
        action: "remove"
    }
];