import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Comuna } from "../entity/comuna.entity";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { ComunaDto } from "../dto/Comuna.dto";
import { ComunaRequestDto } from "../dto/models.dto";

@Injectable()
export class ComunaService {

    constructor(@InjectRepository(Comuna) private repository: Repository<Comuna>) { }

    async getAll(): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comuna[] = [];
        try {
            dataResponse = await this.repository.find({
                select: ['codigo', 'descrip', 'estado']
            });
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': ' + error;
            resp.data = null;
            console.log(JSON.stringify(resp));
            return resp;
        }
        if (dataResponse.length === 0) {
            resp.code = '-2';
            resp.message = StatusCode.ERROR + ', Sin Registros';
            resp.data = null;
            return resp;
        }
        resp.data = this.convertToVOs(dataResponse);
        return resp;
    }

    async new(reqNew: ComunaRequestDto): Promise<GenericResponse> {
        // console.log('method new');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comuna = new Comuna();
        try {
            const { codigo, descrip } = reqNew;
            try {
                let toNew: Comuna = await this.repository.findOneBy(
                    [{ codigo: parseInt(codigo) }, { descrip }]
                );
                if (toNew) {
                    resp.code = '-4';
                    resp.data = null;
                    resp.message = 'Comuna ya existe';
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
                const newElement = Object.assign(new Comuna(), {
                    codigo, descrip, estado: true
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

    async edit(reqEdit: ComunaRequestDto, codigo: number): Promise<GenericResponse> {
        // console.log('method edit');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comuna = new Comuna();
        let elementToEdit: Comuna = new Comuna();
        try {
            //const codigo = parseInt(codigo);
            elementToEdit = await this.repository.findOneBy({ codigo });
            if (!elementToEdit) {
                resp.code = '-3';
                resp.data = new Comuna();
                console.log('Comuna no existe');
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
        let RegistroToRemove: Comuna = new Comuna();
        try {
            //const codigo = parseInt(request.params.codigo);
            RegistroToRemove = await this.repository.findOneBy({ codigo });
            if (!RegistroToRemove) {
                resp.code = '1';
                resp.data = new Comuna();
                resp.message = StatusCode.ERROR + ': Comuna no existe';
                return resp;
            }
        } catch (error) {
            resp.code = '-1';
            resp.message = StatusCode.ERROR + ': Al buscar la Comuna';
            resp.data = null;
            return resp;
        }

        try {
            const removeVal: Comuna = await this.repository.remove(RegistroToRemove);
            resp.data = null;
        } catch (error) {
            console.log(JSON.stringify(error));
            resp.code = '-2';
            resp.message = StatusCode.ERROR;
            resp.data = null;
        }
        return resp;
    }

    async findByFilter(reqFindByFilter: ComunaRequestDto): Promise<GenericResponse> {
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

    private convertToVOs(inputUser: Comuna[]): ComunaDto[] {
        let salidaUser: ComunaDto[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Comuna): ComunaDto {
        let itemUser: ComunaDto = new ComunaDto();
        itemUser = new ComunaDto();
        itemUser.codigo = inputUser.codigo;
        itemUser.descrip = inputUser.descrip;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

    private getObjectEdit(reqEdit: ComunaRequestDto, elementToEdit: Comuna): Comuna {
        const { descrip, estado } = reqEdit;
        if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
            console.log('descrip: [' + descrip + ']');
            elementToEdit.descrip = descrip;
        }
        if (typeof estado !== 'undefined' && estado !== null) {
            console.log('estado: [' + estado + ']');
            elementToEdit.estado = estado;
        }
        return elementToEdit;
    }

}