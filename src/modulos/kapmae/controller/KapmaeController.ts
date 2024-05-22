import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Kapmae } from "../entities/Kapmae";
import { Like } from "typeorm";
import { FilterExpenseDto } from "../../../utils/vo/FilterExpense.dto";
import { PaginationResultInterface } from "../../../utils/paginate/pagination.results.interface";

export class KapmaeController {

    private repository = AppDataSource.getRepository(Kapmae);

    async all(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method all');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae[] = [];
        try {
            dataResponse = await this.repository.find();
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            dataResponse = null;
        }
        resp.data = dataResponse;
        return resp;
    }

    async one(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method one');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Kapmae = new Kapmae();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Kapmae = await this.repository.findOne({ where: { id } });
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

    async save(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method save');
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

    async remove(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method remove');
        let resp: GenericResponse = new GenericResponse();
        let comunasToRemove: Kapmae = new Kapmae();
        try {
            const id = parseInt(request.params.id);
            comunasToRemove = await this.repository.findOneBy({ id });
            if (!comunasToRemove) {
                //return "this Kapmae not exist";
                resp.code = '1';
                resp.data = new Kapmae();
                console.log('Sin Data');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Kapmae = await this.repository.remove(comunasToRemove);
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
                        nombres: nombres ? Like('%' + nombres + '%') : null,
                        ape_pat: ape_pat ? Like('%' + ape_pat + '%') : null,
                        ape_mat: ape_mat ? Like('%' + ape_mat + '%') : null,
                        cod_cop: cod_cop ? cod_cop : null,
                        sec_cop: sec_cop ? sec_cop : null,
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