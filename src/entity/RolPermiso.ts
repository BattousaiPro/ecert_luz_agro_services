import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'rol_permiso' })
export class RolPermiso {

    @PrimaryColumn({ name: 'rol_id' })
    rolId: number;

    @PrimaryColumn({ name: 'permiso_id' })
    permisoId: number;

}
