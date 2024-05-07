import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Comunas {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    codigo: number

    @Column()
    descrip: string

}
