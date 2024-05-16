import { TipCteController } from "../controller/TipCteController";

export const RoutesTipCte = [
    {
        method: "get",
        route: "/tipCte",
        controller: TipCteController,
        action: "all"
    }, {
        method: "get",
        route: "/tipCte/:id",
        controller: TipCteController,
        action: "one"
    }, {
        method: "post",
        route: "/tipCte",
        controller: TipCteController,
        action: "save"
    }, {
        method: "delete",
        route: "/tipCte/:id",
        controller: TipCteController,
        action: "remove"
    }
];