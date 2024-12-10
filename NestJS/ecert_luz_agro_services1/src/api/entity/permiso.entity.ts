import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Rol } from "./rol.entity";

@Entity({ name: 'PERMISOS' })
export class Permiso {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'descrip' })
    descrip: string;

    @Column({ name: 'code' })
    code: string;

    @Column({ name: 'estado' })
    estado: boolean;

    @ManyToMany(
        () => Rol,
        rol => rol.permisos,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', },
    )
    roles: Rol[];

}
