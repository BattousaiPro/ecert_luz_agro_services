import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Kapmae } from "./kapmae.entity";

@Entity({ name: 'SECTOR' })
export class Sector {

    @PrimaryGeneratedColumn({ name: 'codigo' })
    codigo: number;

    @Column({ name: 'descrip' })
    descrip: string;

    @Column({ name: 'dia_car' })
    diaCar: number;

    @Column({ name: 'cod_cob' })
    codCob: number;

    @Column({ name: 'estado' })
    estado: boolean;

    @OneToOne(() => Kapmae, (kapmae) => kapmae.sec_cop)
    kapmae: Kapmae;

}
