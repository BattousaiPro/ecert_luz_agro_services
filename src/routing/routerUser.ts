import { UserController } from "../controller/UserController";

const basePath ='/user';

export const RoutesUser = [
    {
        method: "get",
        route: basePath,
        controller: UserController,
        action: "getAll"
    }, {
        method: "get",
        route: basePath + "/:id",
        controller: UserController,
        action: "getById"
    }, {
        method: "post",
        route: basePath,
        controller: UserController,
        action: "newUser"
    }, {
        method: "patch",
        route:  basePath + "/:id",
        controller: UserController,
        action: "editUser"
    }, {
        method: "delete",
        route:  basePath + "/:id",
        controller: UserController,
        action: "deleteUser"
    },

    /*
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: "/user/access",
        controller: UserController,
        action: "userAccess"
    }, {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    }
    */
];