import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('TIPCTE')
export class TipCte {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @Column({name: 'cod_cte'})
    codCte: number;

    @Column({name: 'des_cte'})
    desCte: string;

}
