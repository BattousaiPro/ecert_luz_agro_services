import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('Ejemplo')
export class Ejemplo {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'asd1'})
    datastring: string;

    @Column({name: 'asd'})
    dataDate: Date;

    @Column({name: 'asd_asd'})
    databoolean: boolean;

}
