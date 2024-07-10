import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Usuarios } from "./Usuarios";
import { Permisos } from "./Permisos";

@Entity({ name: 'ROLES' })
export class Roles {

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
        () => Usuarios,
        user => user.roles,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', },
    )
    users: Usuarios[];

    @ManyToMany(() => Permisos, (permiso) => permiso.roles
        , { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinTable({
        name: 'ROL_PERMISO',
        joinColumn: {
            name: 'rol_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'permiso_id',
            referencedColumnName: 'id',
        },
    })
    permisos: Permisos[];

}
