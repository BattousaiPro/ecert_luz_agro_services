import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Roles } from "./Roles";
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'USUARIOS' })
export class Usuarios {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'cta_username' })
    ctaUserName: string;

    @Column({ name: 'cta_password' })
    ctaPassWord: string;

    @Column({ name: 'cta_email' })
    ctaEmail: string;

    @Column({ name: 'estado' })
    estado: boolean;

    @ManyToMany(() => Roles, (rol) => rol.users
        , { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinTable({
        name: 'user_rol',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'rol_id',
            referencedColumnName: 'id',
        },
    })
    roles: Roles[];

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.ctaPassWord = bcrypt.hashSync(this.ctaPassWord, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.ctaPassWord);
    }

}
