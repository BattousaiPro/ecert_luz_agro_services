import { PermisoDto } from "./Permiso.dto";

export class RolDto {
    id: number;
    name: string;
    descrip: string;
    code: string;
    estado: boolean;
    permisos: PermisoDto[];
}
