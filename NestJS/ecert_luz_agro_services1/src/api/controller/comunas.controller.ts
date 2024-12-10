import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ComunasService } from "../service/comunas.service";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("client")
@Controller('/comunas')
export class ComunasController {

    constructor(private comunasService: ComunasService) {}

    @Get("/")
    async getAll() {
        return await this.comunasService.getAll();
    }

}