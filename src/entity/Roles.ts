import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'ROLES'})
export class Roles {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'descrip'})
    descrip: string;

    @Column({name: 'code'})
    code: string;

    @Column({name: 'estado'})
    estado: boolean;

}
