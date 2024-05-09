import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('permisos')
export class Permisos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    descrip: string

}
