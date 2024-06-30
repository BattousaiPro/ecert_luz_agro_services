import { PermisosVO } from "./PermisosVO";

export class RolesVO {
    id: number;
    name: string;
    descrip: string;
    code: string;
    estado: boolean;
    permisos: PermisosVO[];
}
