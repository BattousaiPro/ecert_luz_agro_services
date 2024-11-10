import { RolesVO } from "./RolesVO";

export class UsuariosVO {
    id: number;
    ctaUserName: string;
    ctaPassWord: string;
    ctaEmail: string;
    estado: boolean;
    roles: RolesVO[];
}
