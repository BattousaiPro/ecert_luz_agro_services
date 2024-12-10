import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { SectorRequestDto } from "../dto/models.dto";
import { Sector } from "../entity/sector.entity";
import { SectorDto } from "../dto/Sector.dto";

@Injectable()
export class SectorService {

    constructor(@InjectRepository(Sector) private repository: Repository<Sector>) { }

    async getAll(): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['codigo', 'descrip', 'diaCar', 'codCob', 'estado']
            });
        } catch (e) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR + ': ' + e;
            resp.data = null;
            console.log(JSON.stringify(resp));
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

    async new(reqNew: SectorRequestDto): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector = new Sector();
        try {
            const { codigo, descrip, diaCar, codCob } = reqNew;
            try {
                let toNew: Sector = await this.repository.findOneBy({
                    codigo
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

    async edit(reqEdit: SectorRequestDto, codigo: number): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Sector = new Sector();
        let elementToEdit: Sector = new Sector();
        try {
            //const codigo = parseInt(codigo);
            elementToEdit = await this.repository.findOneBy({ codigo });
            if (!elementToEdit) {
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
            elementToEdit = this.getObjectEdit(reqEdit, elementToEdit);
            dataResponse = await this.repository.save(elementToEdit);
            return resp;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-1';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async delete(codigo: number): Promise<GenericResponse> {
        // console.log('method delete');
        let resp: GenericResponse = new GenericResponse();
        let sectorToRemove: Sector = new Sector();
        try {
            //const codigo = parseInt(request.params.codigo);
            sectorToRemove = await this.repository.findOneBy({ codigo });
            if (!sectorToRemove) {
                resp.code = '3';
                resp.data = new Sector();
                resp.message = StatusCode.ERROR + ': Sector no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-2';
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

    async findByFilter(reqFindByFilter: SectorRequestDto): Promise<GenericResponse> {
        // console.log('method findByFilter');
        let resp: GenericResponse = new GenericResponse();
        const { codigo, descrip, limit, pageSize } = reqFindByFilter;
        try {
            const [results, totalReg] = await this.repository.findAndCount(
                {
                    where: {
                        codigo: codigo ? parseInt(codigo) : null,
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
        return resp;
    }

    private convertToVOs(inputUser: Sector[]): SectorDto[] {
        let salidaUser: SectorDto[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Sector): SectorDto {
        let itemUser: SectorDto = new SectorDto();
        itemUser = new SectorDto();
        itemUser.codigo = inputUser.codigo;
        itemUser.descrip = inputUser.descrip;
        itemUser.diaCar = inputUser.diaCar;
        itemUser.codCob = inputUser.codCob;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

    private getObjectEdit(request: SectorRequestDto, elementToEdit: Sector): Sector {
        const { descrip, diaCar, codCob, estado } = request;
        if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
            console.log('descrip: [' + descrip + ']');
            elementToEdit.descrip = descrip;
        }
        if (typeof diaCar !== 'undefined' && diaCar !== null) {
            console.log('diaCar: [' + diaCar + ']');
            elementToEdit.diaCar = diaCar;
        }
        if (typeof codCob !== 'undefined' && codCob !== null) {
            console.log('codCob: [' + codCob + ']');
            elementToEdit.codCob = codCob;
        }
        if (typeof estado !== 'undefined' && estado !== null) {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}