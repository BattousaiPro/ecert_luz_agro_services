import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'rol_permiso' })
export class RolPermiso {

    @PrimaryGeneratedColumn({ name: 'rol_id' })
    rolId: number;

    @PrimaryGeneratedColumn({ name: 'permiso_id' })
    permisoId: string;

}
