import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Roles } from "./Roles";

@Entity({ name: 'PERMISOS' })
export class Permisos {

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
        () => Roles,
        rol => rol.permisos,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', },
    )
    roles: Roles[];

}
