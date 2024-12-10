import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Permiso } from "./permiso.entity";

@Entity({ name: 'ROLES' })
export class Rol {

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
        () => User,
        user => user.roles,
        { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', },
    )
    users: User[];

    @ManyToMany(() => Permiso, (permiso) => permiso.roles
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
    permisos: Permiso[];

}
