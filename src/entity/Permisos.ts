import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Permisos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descrip: string

}
