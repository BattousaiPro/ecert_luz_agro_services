import { PermisosVO } from "./PermisosVO";

export interface UserAuthVO {
    token: string;
    permisos: string[];
}

export class UserAuthVO implements UserAuthVO {
    constructor() {
        this.permisos = [];
    }
}