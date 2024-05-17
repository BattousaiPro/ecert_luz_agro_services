import AuthController from "../controller/AuthController";

const basePath = '/auth';

export const RoutesAuth = [
    {
        method: "post",
        route: basePath + '/login',
        controller: AuthController,
        action: "login"
    },
];