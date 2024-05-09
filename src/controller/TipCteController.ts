import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { TipCte } from "../entity/TipCte"

export class TipCteController {

    private tipCteRepository = AppDataSource.getRepository(TipCte)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.tipCteRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        const tipCte = await this.tipCteRepository.findOne({
            where: { id }
        })
        if (!tipCte) {
            return "unregistered tipCte"
        }
        return tipCte
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, codCte, desCte } = request.body;
        const tipCte = Object.assign(new TipCte(), {
            id,
            codCte,
            desCte
        })
        return this.tipCteRepository.save(tipCte)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)
        let tipCteToRemove = await this.tipCteRepository.findOneBy({ id })
        if (!tipCteToRemove) {
            return "this tipCte not exist"
        }
        await this.tipCteRepository.remove(tipCteToRemove)
        return "tipCte has been removed"
    }

}