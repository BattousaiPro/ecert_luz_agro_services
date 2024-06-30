import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'user_rol' })
export class UserRol {

    @PrimaryColumn({ name: 'user_id' })
    userId: number;

    @PrimaryColumn({ name: 'rol_id' })
    rolId: number;

}
