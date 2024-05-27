import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Kapmae } from "../entities/Kapmae";
import { KapmaeVO } from "../dto/KapmaeVO";
import { Like } from "typeorm";

export class KapmaeController {

    private repository = AppDataSource.getRepository(Kapmae);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae[] = [];
        try {
            dataResponse = await this.repository.find({
                relations: {
                    sector: true,
                    comuna: true,
                }
            });
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }
        if (dataResponse.length === 0) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return resp;
        }
        resp.data = this.convertToVOs(dataResponse);
        return resp;
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae = new Kapmae();
        try {
            const id = parseInt(request.params.id);
            dataResponse = await this.repository.findOne({
                where: { id },
                relations: {
                    sector: true,
                    comuna: true,
                },
            });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Kapmae();
                console.log('Sin Data');
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async new(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae = new Kapmae();
        try {
            const {
                rut_cop, ape_pat, ape_mat, nombres, cod_cop, cod_lli, cod_ant, cod_nvo, cod_ori,
                sec_cop, ano_inc, mto_inc, fec_inc, ano_tra, kap_tra, fec_tra, acc_tra, acc_ret,
                acc_apo, fec_act, est_tra, est_bon, dir_pos, nro_te1, nro_te2, nro_te3, nro_te4,
                com_pos, obs_cap, nro_sol, fec_sol, fec_apr, fec_can, est_sol, sec_cte, area,
                sec_imp, est_reg, acc_con, aju_acc
            } = request.body;
            const kapmae = Object.assign(new Kapmae(), {
                rut_cop,
                ape_pat,
                ape_mat,
                nombres,
                cod_cop,
                cod_lli,
                cod_ant,
                cod_nvo,
                cod_ori,
                sec_cop,
                ano_inc,
                mto_inc,
                fec_inc,
                ano_tra,
                kap_tra,
                fec_tra,
                acc_tra,
                acc_ret,
                acc_apo,
                fec_act,
                est_tra,
                est_bon,
                dir_pos,
                nro_te1,
                nro_te2,
                nro_te3,
                nro_te4,
                com_pos,
                obs_cap,
                nro_sol,
                fec_sol,
                fec_apr,
                fec_can,
                est_sol,
                sec_cte,
                area,
                sec_imp,
                est_reg,
                acc_con,
                aju_acc
            });
            dataResponse = await this.repository.save(kapmae);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        return resp;
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let RegistroToRemove: Kapmae = new Kapmae();
        try {
            const id = parseInt(request.params.id);
            RegistroToRemove = await this.repository.findOneBy({ id });
            if (!RegistroToRemove) {
                resp.code = '1';
                resp.data = new Kapmae();
                resp.message = StatusCode.ERROR + ': Socio no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar al Socio';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Kapmae = await this.repository.remove(RegistroToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { rut_cop, nombres, ape_pat, ape_mat, cod_cop, sec_cop, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        rut_cop: rut_cop ? Like('%' + rut_cop + '%') : null,
                        nombres: nombres ? Like(nombres + '%') : null,
                        ape_pat: ape_pat ? Like(ape_pat + '%') : null,
                        ape_mat: ape_mat ? Like(ape_mat + '%') : null,
                        //cod_cop: cod_cop ? cod_cop : null,
                        //sec_cop: sec_cop ? sec_cop : null,
                    },
                    relations: {
                        sector: true,
                        comuna: true,
                    },
                    order: { id: "DESC" },
                    take: limit,
                    skip: pageSize,
                }
            );
            resp.data = {
                totalReg,
                nextPage: pageSize + 1,
                previousPage: pageSize,
                results,
            };
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    private convertToVOs(inputUser: Kapmae[]): KapmaeVO[] {
        let salidaUser: KapmaeVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Kapmae): KapmaeVO {
        let itemUser: KapmaeVO = new KapmaeVO();
        itemUser = new KapmaeVO();
        itemUser.id = inputUser.id;
        itemUser.rut_cop = inputUser.rut_cop;
        itemUser.ape_pat = inputUser.ape_pat;
        itemUser.ape_mat = inputUser.ape_mat;
        itemUser.nombres = inputUser.nombres;
        itemUser.cod_cop = inputUser.cod_cop;
        itemUser.cod_lli = inputUser.cod_lli;
        itemUser.cod_ant = inputUser.cod_ant;
        itemUser.cod_nvo = inputUser.cod_nvo;
        itemUser.cod_ori = inputUser.cod_ori;
        /** Init Sección Sector **/
        itemUser.sec_cop = inputUser.sec_cop;
        itemUser.sector = inputUser.sector;
        /** Fin Sección Sector **/
        itemUser.ano_inc = inputUser.ano_inc;
        itemUser.mto_inc = inputUser.mto_inc;
        itemUser.fec_inc = inputUser.fec_inc;
        itemUser.ano_tra = inputUser.ano_tra;
        itemUser.kap_tra = inputUser.kap_tra;
        itemUser.fec_tra = inputUser.fec_tra;
        itemUser.acc_tra = inputUser.acc_tra;
        itemUser.acc_ret = inputUser.acc_ret;
        itemUser.acc_apo = inputUser.acc_apo;
        itemUser.fec_act = inputUser.fec_act;
        itemUser.est_tra = inputUser.est_tra;
        itemUser.est_bon = inputUser.est_bon;
        itemUser.dir_pos = inputUser.dir_pos;
        itemUser.nro_te1 = inputUser.nro_te1;
        itemUser.nro_te2 = inputUser.nro_te2;
        itemUser.nro_te3 = inputUser.nro_te3;
        itemUser.nro_te4 = inputUser.nro_te4;
        /** Init Comunas Sector **/
        itemUser.com_pos = inputUser.com_pos;
        itemUser.comuna = inputUser.comuna;
        /** Fin Comunas Sector **/
        itemUser.obs_cap = inputUser.obs_cap;
        itemUser.nro_sol = inputUser.nro_sol;
        itemUser.fec_sol = inputUser.fec_sol;
        itemUser.fec_apr = inputUser.fec_apr;
        itemUser.fec_can = inputUser.fec_can;
        itemUser.est_sol = inputUser.est_sol;
        itemUser.sec_cte = inputUser.sec_cte;
        itemUser.area = inputUser.area;
        itemUser.sec_imp = inputUser.sec_imp;
        itemUser.est_reg = inputUser.est_reg;
        itemUser.acc_con = inputUser.acc_con;
        itemUser.aju_acc = inputUser.aju_acc;

        return itemUser;
    }

}