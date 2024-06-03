import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_rol' })
export class UserRol {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @PrimaryGeneratedColumn({ name: 'rol_id' })
    rolId: string;

}
