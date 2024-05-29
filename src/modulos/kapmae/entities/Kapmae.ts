import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Sector } from "../../sector/entities/Sector";
import { Comunas } from "../../comunas/entities/Comunas";

@Entity({ name: 'KAPMAE' })
export class Kapmae {

    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'rut_cop' })
    rut_cop: string;

    @Column({ name: 'ape_pat' })
    ape_pat: string;

    @Column({ name: 'ape_mat' })
    ape_mat: string;

    @Column({ name: 'nombres' })
    nombres: string;

    @Column({ name: 'cod_cop' })
    cod_cop: number;

    @Column({ name: 'cod_lli' })
    cod_lli: number;

    @Column({ name: 'cod_ant' })
    cod_ant: number;

    @Column({ name: 'cod_nvo' })
    cod_nvo: number;

    @Column({ name: 'cod_ori' })
    cod_ori: number;

    /** Init Sección Sector **/
    @OneToOne(() => Sector, (sector) => sector.kapmae)
    @JoinColumn({ name: 'sec_cop' })
    sec_cop: Sector;
    /** Fin Sección Sector **/

    @Column({ name: 'ano_inc' })
    ano_inc: number;

    @Column({ name: 'mto_inc' })
    mto_inc: number;

    @Column({ name: 'fec_inc' })
    fec_inc: Date;

    @Column({ name: 'ano_tra' })
    ano_tra: number;

    @Column({ name: 'kap_tra' })
    kap_tra: number;

    @Column({ name: 'fec_tra' })
    fec_tra: Date;

    @Column({ name: 'acc_tra' })
    acc_tra: number;

    @Column({ name: 'acc_ret' })
    acc_ret: number;

    @Column({ name: 'acc_apo' })
    acc_apo: number;

    @Column({ name: 'fec_act' })
    fec_act: Date;

    @Column({ name: 'est_tra' })
    est_tra: string;

    @Column({ name: 'est_bon' })
    est_bon: number;

    @Column({ name: 'dir_pos' })
    dir_pos: string;

    @Column({ name: 'nro_te1' })
    nro_te1: string;

    @Column({ name: 'nro_te2' })
    nro_te2: string;

    @Column({ name: 'nro_te3' })
    nro_te3: string;

    @Column({ name: 'nro_te4' })
    nro_te4: string;

    /** Init Comunas Sector **/
    @OneToOne(() => Comunas, (comuna) => comuna.kapmae)
    @JoinColumn({ name: 'com_pos' })
    com_pos: Comunas;
    /** Fin Comunas Sector **/

    @Column({ name: 'obs_cap' })
    obs_cap: string;

    @Column({ name: 'nro_sol' })
    nro_sol: number;

    @Column({ name: 'fec_sol' })
    fec_sol: Date;

    @Column({ name: 'fec_apr' })
    fec_apr: Date;

    @Column({ name: 'fec_can' })
    fec_can: Date;

    @Column({ name: 'est_sol' })
    est_sol: string;

    @Column({ name: 'sec_cte' })
    sec_cte: number;

    @Column({ name: 'area' })
    area: number;

    @Column({ name: 'sec_imp' })
    sec_imp: number;

    @Column({ name: 'est_reg' })
    est_reg: string;

    @Column({ name: 'acc_con' })
    acc_con: number;

    @Column({ name: 'aju_acc' })
    aju_acc: number;

}
