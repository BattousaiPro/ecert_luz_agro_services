import { RolDto } from "./Rol.dto";

export class UserDto {
    id: number;
    ctaUserName: string;
    ctaPassWord: string;
    ctaEmail: string;
    estado: boolean;
    roles: RolDto[];
}