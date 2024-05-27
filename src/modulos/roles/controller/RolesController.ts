import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Roles } from "../entities/Roles";
import { RolesVO } from "../dto/RolesVO";
import { Like } from "typeorm";

export class RolesController {

    private repository = AppDataSource.getRepository(Roles);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Roles[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['id', 'name', 'descrip', 'code', 'estado']
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
        let dataResponse: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            dataResponse = await this.repository.findOne({
                where: { id }
            });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Roles();
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
        let dataResponse: Roles = new Roles();
        try {
            const {
                name, descrip, code
            } = request.body;
            try {
                let toNew: Roles = await this.repository.findOneBy({
                    name
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Rol ya existe';
                    return resp;
                }
            } catch (error) {
                console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return resp;
            }

            try {
                const newElement = Object.assign(new Roles(), {
                    name, descrip, code, estado: true
                });
                dataResponse = await this.repository.save(newElement);
                resp.data = dataResponse.id;
            } catch (error) {
                console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
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
        let dataResponse: Roles = new Roles();
        let rolToNew: Roles = new Roles();
        const { name, descrip, code, estado } = request.body;
        try {
            rolToNew = await this.repository.findOneBy({ name, code });
            if (rolToNew) {
                resp.code = '-2';
                resp.data = new Roles();
                resp.message = 'Rol ya existe';
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
            const roles = Object.assign(new Roles(), {
                name,
                descrip,
                code,
                estado
            });
            dataResponse = await this.repository.save(roles);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let rolesToRemove: Roles = new Roles();
        try {
            const id = parseInt(request.params.id);
            rolesToRemove = await this.repository.findOneBy({ id });
            if (!rolesToRemove) {
                resp.code = '1';
                resp.data = new Roles();
                resp.message = StatusCode.ERROR + ': Rol no existe';
                return resp;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Rol';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Roles = await this.repository.remove(rolesToRemove);
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
        const { name, descrip, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        name: name ? Like('%' + name + '%') : null,
                        descrip: descrip ? Like('%' + descrip + '%') : null,
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

    private convertToVOs(inputUser: Roles[]): RolesVO[] {
        let salidaUser: RolesVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Roles): RolesVO {
        let itemUser: RolesVO = new RolesVO();
        itemUser = new RolesVO();
        itemUser.id = inputUser.id;
        itemUser.name = inputUser.name;
        itemUser.descrip = inputUser.descrip;
        itemUser.code = inputUser.code;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}