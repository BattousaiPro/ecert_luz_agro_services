import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Usuarios } from "../../users/entities/Usuarios";

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

}
