import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('sector')
export class Sector {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    codigo: number

    @Column()
    descrip: string

    @Column()
    dia_car: number

    @Column()
    cod_cob: number

}
