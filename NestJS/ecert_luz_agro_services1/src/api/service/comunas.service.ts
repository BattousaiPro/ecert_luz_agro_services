import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comunas } from "../entity/comunas.entity";
import { GenericResponse, StatusCode } from "../dto/GenericResponse.dto";
import { ComunasVO } from "../dto/Comunas.dto";

@Injectable()
export class ComunasService {

    constructor(@InjectRepository(Comunas) private repository: Repository<Comunas>) { }

    async getAll(): Promise<GenericResponse> {
        // console.log('method getAll');
        let resp: GenericResponse = new GenericResponse();
        let dataResponse: Comunas[] = [];
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

    private convertToVOs(inputUser: Comunas[]): ComunasVO[] {
        let salidaUser: ComunasVO[] = [];
        for (let index = 0; index < inputUser.length; index++) {
            salidaUser.push(this.convertToVO(inputUser[index]));
        }
        return salidaUser;
    }

    private convertToVO(inputUser: Comunas): ComunasVO {
        let itemUser: ComunasVO = new ComunasVO();
        itemUser = new ComunasVO();
        itemUser.codigo = inputUser.codigo;
        itemUser.descrip = inputUser.descrip;
        itemUser.estado = inputUser.estado;
        return itemUser;
    }

}