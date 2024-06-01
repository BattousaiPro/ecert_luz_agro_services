import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

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

}
