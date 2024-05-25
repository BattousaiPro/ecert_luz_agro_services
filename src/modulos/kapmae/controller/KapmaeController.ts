import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Kapmae } from "../entities/Kapmae";
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
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            dataResponse = null;
        }
        resp.data = dataResponse;
        return resp;
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae = new Kapmae();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Kapmae = await this.repository.findOne({
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
            const { id, rut_cop, ape_pat, ape_mat, nombres, cod_cop, cod_lli, cod_ant, cod_nvo, cod_ori, sec_cop, ano_inc, mto_inc, fec_inc, ano_tra, kap_tra, fec_tra, acc_tra, acc_ret, acc_apo, fec_act, est_tra, est_bon, dir_pos, nro_te1, nro_te2, nro_te3, nro_te4, com_pos, obs_cap, nro_sol, fec_sol, fec_apr, fec_can, est_sol, sec_cte, area, sec_imp, est_reg, acc_con, aju_acc } = request.body;
            const kapmae = Object.assign(new Kapmae(), {
                id,
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
        let kapmaeToRemove: Kapmae = new Kapmae();
        try {
            const id = parseInt(request.params.id);
            kapmaeToRemove = await this.repository.findOneBy({ id });
            if (!kapmaeToRemove) {
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
            const removeVal: Kapmae = await this.repository.remove(kapmaeToRemove);
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
        let resp: GenericResponse = new GenericResponse();
        console.log('method findByFilter');
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

}