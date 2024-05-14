import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Ejemplo } from "../entity/Ejemplo"

export class EjemploController {

    private ejemploRepository = AppDataSource.getRepository(Ejemplo);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.ejemploRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const ejemplo = await this.ejemploRepository.findOne({
            where: { id }
        })

        if (!ejemplo) {
            return "unregistered ejemplo"
        }
        return ejemplo
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, datastring, dataDate, databoolean } = request.body;

        const ejemplo = Object.assign(new Ejemplo(), {
            id,
            datastring,
            dataDate,
            databoolean
        })

        return this.ejemploRepository.save(ejemplo)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let ejemploToRemove = await this.ejemploRepository.findOneBy({ id })

        if (!ejemploToRemove) {
            return "this ejemplo not exist"
        }

        await this.ejemploRepository.remove(ejemploToRemove)

        return "ejemplo has been removed"
    }

}