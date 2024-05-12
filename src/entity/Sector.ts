import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('SECTOR')
export class Sector {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'codigo'})
    codigo: number;

    @Column({name: 'descrip'})
    descrip: string;

    @Column({name: 'dia_car'})
    diaCar: number;

    @Column({name: 'cod_cob'})
    codCob: number;

}
