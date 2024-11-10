import { Request, Response } from "express";
import { GenericResponse, StatusCode } from "../vo/GenericResponse";
import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { SectorVO } from "../vo/SectorVO";
import { Sector } from "../entity/Sector";

export class SectorController {

    private static repository = AppDataSource.getRepository(Sector);

    constructor() { }

    static getAll = async (request: Request, response: Response) => {
        console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['codigo', 'descrip', 'diaCar', 'codCob', 'estado']
            });
        } catch (e) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return response.status(200).send(resp);
        }
        if (dataResponse.length === 0) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return response.status(200).send(resp);
        }
        resp.data = this.convertToVOs(dataResponse);
        return response.send(resp);
    }

    static new = async (request: Request, response: Response) => {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector = new Sector();
        try {
            const {
                codigo, descrip, diaCar, codCob
            } = request.body;
            try {
                let toNew: Sector = await this.repository.findOneBy({
                    codigo
                });
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Sector ya existe';
                    return response.status(200).send(resp);
                }
            } catch (error) {
                // console.log(JSON.stringify(error));
                resp.code = '-3';
                resp.message = StatusCode.ERROR;
                resp.data = null;
                return response.status(200).send(resp);
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
        return response.status(200).send(resp);
    }

    static edit = async (request: Request, response: Response) => {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector = new Sector();
        let elementToEdit: Sector = new Sector();
        try {
            const codigo = parseInt(request.params.codigo);
            elementToEdit = await this.repository.findOneBy({ codigo });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Sector();
                console.log('Sector no existe');
                return response.status(200).send(resp);
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
            return response.status(200).send(resp);
        }

        try {
            elementToEdit = this.getObjectEdit(request, elementToEdit);
            dataResponse = await this.repository.save(elementToEdit);
            return response.send(resp);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return response.status(200).send(resp);
    }

    static delete = async (request: Request, response: Response) => {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let sectorToRemove: Sector = new Sector();
        try {
            const codigo = parseInt(request.params.codigo);
            sectorToRemove = await this.repository.findOneBy({ codigo });
            if (!sectorToRemove) {
                resp.code = '3';
                resp.data = new Sector();
                resp.message = StatusCode.ERROR + ': Sector no existe';
                return response.status(200).send(resp);
            }
        } catch (error) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR + ': Al buscar el Sector';
            resp.data = null;
            return response.status(200).send(resp);
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
        return response.send(resp);
    }

    static findByFilter = async (request: Request, response: Response) => {
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
                    skip: (pageSize - 1) * limit
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
        return response.send(resp);
    }

    private static convertToVOs(inputUser: Sector[]): SectorVO[] {
        let salidaUser: SectorVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private static convertToVO(inputUser: Sector): SectorVO {
        let itemUser: SectorVO = new SectorVO();
        itemUser = new SectorVO();
        itemUser.codigo = inputUser.codigo;
        itemUser.descrip = inputUser.descrip;
        itemUser.diaCar = inputUser.diaCar;
        itemUser.codCob = inputUser.codCob;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

    private static getObjectEdit(request: Request, elementToEdit: Sector): Sector {
        const { descrip, diaCar, codCob, estado } = request.body;
        if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
            console.log('descrip: [' + descrip + ']');
            elementToEdit.descrip = descrip;
        }
        if (typeof diaCar !== 'undefined' && diaCar !== null && diaCar !== '') {
            console.log('diaCar: [' + diaCar + ']');
            elementToEdit.diaCar = diaCar;
        }
        if (typeof codCob !== 'undefined' && codCob !== null && codCob !== '') {
            console.log('codCob: [' + codCob + ']');
            elementToEdit.codCob = codCob;
        }
        if (typeof estado !== 'undefined' && estado !== null && estado !== '') {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}