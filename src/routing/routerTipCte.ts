import { TipCteController } from "../controller/TipCteController";

const basePath = '/tipCte';

export const RoutesTipCte = [
    {
        method: "get",
        route: basePath,
        controller: TipCteController,
        action: "all"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: TipCteController,
        action: "one"
    }, {
        method: "post",
        route: basePath,
        controller: TipCteController,
        action: "save"
    }, {
        method: "delete",
        route: basePath + "/:id",
        controller: TipCteController,
        action: "remove"
    }
];