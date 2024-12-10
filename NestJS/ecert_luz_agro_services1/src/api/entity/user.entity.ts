import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Rol } from "./rol.entity";
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'USUARIOS' })
export class User {

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

    @ManyToMany(() => Rol, (rol) => rol.users
        , { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
    @JoinTable({
        name: 'USER_ROL',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'rol_id',
            referencedColumnName: 'id',
        },
    })
    roles: Rol[];

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.ctaPassWord = bcrypt.hashSync(this.ctaPassWord, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.ctaPassWord);
    }

}
