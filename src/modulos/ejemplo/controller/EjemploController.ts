import { AppDataSource } from "../../../data-source";
import { NextFunction, Request, Response } from "express";
import { GenericResponse, StatusCode } from "../../../vo/GenericResponse";
import { Ejemplo } from "../entities/Ejemplo";



export class EjemploController {

    private repository = AppDataSource.getRepository(Ejemplo);

    async getAll(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let sectores: Ejemplo[] = [];
        try {
            sectores = await this.repository.find();
        } catch (e) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Somenthing goes wrong!';
            resp.data = null;
            return resp;
        }
        if (sectores.length === 0) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ', Not result';
            resp.data = null;
            return resp;
        }
        // resp.data = this.convertToVOs(sectores);
        resp.data = sectores;
        return resp;
    }

    async getById(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        try {
            const id = parseInt(request.params.id);
            const dataResponse: Ejemplo = await this.repository.findOne({ where: { id } });
            resp.data = dataResponse;
            if (!dataResponse) {
                resp.code = '1';
                resp.data = new Ejemplo();
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
        console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Ejemplo = new Ejemplo();
        let SectorToNew: Ejemplo = new Ejemplo();
        const { id, codigo, descrip, diaCar, codCob } = request.body;
        try {
            SectorToNew = await this.repository.findOneBy({ id });
            if (SectorToNew) {
                resp.code = '-2';
                resp.data = new Ejemplo();
                resp.message = 'Usuario ya existe';
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
            const sector = new Ejemplo();
            /*sector.codigo = codigo;
            sector.descrip = descrip;
            sector.diaCar = diaCar;
            sector.codCob = codCob;
            */
            //sector.estado = true;
            dataResponse = await this.repository.save(sector);
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async edit(request: Request, response: Response, next: NextFunction): Promise<GenericResponse> {
        console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Ejemplo = new Ejemplo();
        let sectorToEdit: Ejemplo = new Ejemplo();
        try {
            const id = parseInt(request.params.id);
            sectorToEdit = await this.repository.findOneBy({ id });
            if (!sectorToEdit) {
                //return "this Sector not exist";
                resp.code = '1';
                resp.data = new Ejemplo();
                console.log('Sector not exist');
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
            const { codigo, descrip, diaCar, codCob, estado } = request.body;
            /*
            if (typeof codigo !== 'undefined' && codigo !== null && codigo !== '') {
                console.log('ctaUsr[: ' + codigo + ']');
                sectorToEdit.codigo = codigo;
            }
            if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
                console.log('descrip:[ ' + descrip + ']');
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
                console.log('estado[: ' + estado + ']');
                sectorToEdit.estado = estado;
            }
            */
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
        let ejemploToRemove: Ejemplo = new Ejemplo();
        try {
            const id = parseInt(request.params.id);
            ejemploToRemove = await this.repository.findOneBy({ id });
            if (!ejemploToRemove) {
                resp.code = '1';
                resp.data = new Ejemplo();
                resp.message = StatusCode.ERROR + ': Ejemplo no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar el Ejemplo';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Ejemplo = await this.repository.remove(ejemploToRemove);
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
        const { datastring, limit, pageSize } = request.body;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        datastring: datastring ? datastring : null,
                    },
                    order: { datastring: "DESC" },
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