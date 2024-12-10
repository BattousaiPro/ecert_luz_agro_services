import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Kapmae } from "./kapmae.entity";

@Entity({ name: 'COMUNAS' })
export class Comuna {

    @PrimaryGeneratedColumn({ name: 'codigo' })
    codigo: number;

    @Column({ name: 'descrip' })
    descrip: string;

    @Column({ name: 'estado' })
    estado: boolean;

    @OneToOne(() => Kapmae, (kapmae) => kapmae.com_pos)
    kapmae: Kapmae;

}
