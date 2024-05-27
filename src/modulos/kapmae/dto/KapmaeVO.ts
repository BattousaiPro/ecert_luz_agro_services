import { Comunas } from "../../comunas/entities/Comunas";
import { Sector } from "../../sector/entities/Sector";

export class KapmaeVO {

    id: number;
    rut_cop: string;
    ape_pat: string;
    ape_mat: string;
    nombres: string;
    cod_cop: number;
    cod_lli: number;
    cod_ant: number;
    cod_nvo: number;
    cod_ori: number;
    /** Init Sección Sector **/
    sec_cop: number;
    sector: Sector;
    /** Fin Sección Sector **/
    ano_inc: number;
    mto_inc: number;
    fec_inc: Date;
    ano_tra: number;
    kap_tra: number;
    fec_tra: Date;
    acc_tra: number;
    acc_ret: number;
    acc_apo: number;
    fec_act: Date;
    est_tra: string;
    est_bon: number;
    dir_pos: string;
    nro_te1: string;
    nro_te2: string;
    nro_te3: string;
    nro_te4: string;
    /** Init Comunas Sector **/
    com_pos: number;
    comuna: Comunas;
    /** Fin Comunas Sector **/
    obs_cap: string;
    nro_sol: number;
    fec_sol: Date;
    fec_apr: Date;
    fec_can: Date;
    est_sol: string;
    sec_cte: number;
    area: number;
    sec_imp: number;
    est_reg: string;
    acc_con: number;
    aju_acc: number;

}
