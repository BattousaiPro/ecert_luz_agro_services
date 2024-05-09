import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('roles')
export class Roles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descrip: string

}
