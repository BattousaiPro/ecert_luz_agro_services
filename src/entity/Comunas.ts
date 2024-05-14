import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'COMUNAS'})
export class Comunas {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'codigo'})
    codigo: number;

    @Column({name: 'descrip'})
    descrip: string;

}
