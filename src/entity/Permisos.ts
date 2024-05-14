import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'PERMISOS'})
export class Permisos {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'name'})
    name: string;

    @Column({name: 'descrip'})
    descrip: string;

}
