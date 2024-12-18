import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'USER_ROL' })
export class UserRol {

    @PrimaryColumn({ name: 'user_id' })
    userId: number;

    @PrimaryColumn({ name: 'rol_id' })
    rolId: number;

}
