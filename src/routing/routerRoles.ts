import { RolesController } from "../controller/RolesController";

const basePath = '/roles';

export const RoutesRoles = [
    {
        method: "get",
        route: basePath,
        controller: RolesController,
        action: "all"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: RolesController,
        action: "one"
    }, {
        method: "post",
        route: basePath,
        controller: RolesController,
        action: "save"
    }, {
        method: "delete",
        route: basePath + "/:id",
        controller: RolesController,
        action: "remove"
    }
];