import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { GenericResponse, StatusCode } from "../vo/GenericResponse";
import { Kapmae } from "../entity/Kapmae";

export class FichaController {

    private repository = AppDataSource.getRepository(Kapmae);

    constructor() { }

    async getFindAnios(request: Request, response: Response) {
        // console.log('method getById');
        let resp: GenericResponse = new GenericResponse();
        try {
            const dataResponse: Kapmae[] = await this.repository.find({
                select: { ano_inc: true },
                distinct: ['ano_inc']
            });
            console.log(JSON.stringify(dataResponse));
            resp.data = this.reOrdenar(dataResponse);
            if (!dataResponse) {
                resp.code = '1';
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

    private reOrdenar(arrayDesordenado: Kapmae[]): number[] {
        // Copia el array recibido
        let outArray: number[] = [];
        arrayDesordenado.forEach(function (valor, key) {
            outArray.push(arrayDesordenado[key].ano_inc);
        });
        outArray = outArray.filter(function (x, i, a) { 
            return a.indexOf(x) == i; 
        });
        return outArray.sort();
    }

}
