import { RolesController } from "../controller/RolesController";

export const RoutesRoles = [
    {
        method: "get",
        route: "/roles",
        controller: RolesController,
        action: "all"
    }, {
        method: "get",
        route: "/roles/:id",
        controller: RolesController,
        action: "one"
    }, {
        method: "post",
        route: "/roles",
        controller: RolesController,
        action: "save"
    }, {
        method: "delete",
        route: "/roles/:id",
        controller: RolesController,
        action: "remove"
    }
];