import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Sector } from "../entities/Sector";
import { SectorVO } from "../dto/SectorVO";
import { Like } from "typeorm";

export class SectorController {

    private repository = AppDataSource.getRepository(Sector);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['codigo', 'descrip', 'diaCar', 'codCob', 'estado']
            });
        } catch (e) {
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
        let dataResponse: Sector = new Sector();
        try {
            const codigo = parseInt(request.params.codigo);
            dataResponse = await this.repository.findOne({
                where: { codigo }
            });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Sector();
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
        let dataResponse: Sector = new Sector();
        try {
            const {
                codigo, descrip, diaCar, codCob
            } = request.body;
            try {
                let toNew: Sector = await this.repository.findOneBy({
                    codigo, descrip
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Sector ya existe';
                    return resp;
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return resp;
            }

            try {
                const newElement = Object.assign(new Sector(), {
                    codigo, descrip, diaCar, codCob, estado: true
                });
                dataResponse = await this.repository.save(newElement);
                resp.data = dataResponse.codigo;
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-2';
                resp.message = StatusCode.ERROR;
                resp.data = null;
            }
        } catch (error) {
            // console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector = new Sector();
        let sectorToEdit: Sector = new Sector();
        try {
            const codigo = parseInt(request.params.codigo);
            sectorToEdit = await this.repository.findOneBy({ codigo });
            if (!sectorToEdit) {
                resp.code = '-3';
                resp.data = new Sector();
                console.log('Sector no existe');
                return resp;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }

        try {
            const { descrip, diaCar, codCob, estado } = request.body;
            if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
                console.log('descrip: [' + descrip + ']');
                sectorToEdit.descrip = descrip;
            }
            if (typeof diaCar !== 'undefined' && diaCar !== null && diaCar !== '') {
                console.log('diaCar: [' + diaCar + ']');
                sectorToEdit.diaCar = diaCar;
            }
            if (typeof codCob !== 'undefined' && codCob !== null && codCob !== '') {
                console.log('codCob: [' + codCob + ']');
                sectorToEdit.codCob = codCob;
            }
            if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
                console.log('estado: [' + estado + ']');
                sectorToEdit.estado = estado;
            }
            dataResponse = await this.repository.save(sectorToEdit);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return resp;
        }
        return resp;
    }

    async delete(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let sectorToRemove: Sector = new Sector();
        try {
            const codigo = parseInt(request.params.codigo);
            sectorToRemove = await this.repository.findOneBy({ codigo });
            if (!sectorToRemove) {
                resp.code = '1';
                resp.data = new Sector();
                resp.message = StatusCode.ERROR + ': Sector no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Sector';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Sector = await this.repository.remove(sectorToRemove);
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
        const { codigo, descrip, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        codigo: codigo ? codigo : null,
                        descrip: descrip ? Like('%' + descrip + '%') : null,
                    },
                    order: { codigo: "ASC" },
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

    private convertToVOs(inputUser: Sector[]): SectorVO[] {
        let salidaUser: SectorVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Sector): SectorVO {
        let itemUser: SectorVO = new SectorVO();
        itemUser = new SectorVO();
        itemUser.codigo = inputUser.codigo;
        itemUser.descrip = inputUser.descrip;
        itemUser.diaCar = inputUser.diaCar;
        itemUser.codCob = inputUser.codCob;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}