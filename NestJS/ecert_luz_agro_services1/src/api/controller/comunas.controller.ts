import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ComunasService } from "../service/comunas.service";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { GenericResponse } from "../dto/GenericResponse.dto";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("client")
@Controller('/comunas')
export class ComunasController {

    constructor(private comunasService: ComunasService) {}

    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll(): Promise<GenericResponse> {
        return await this.comunasService.getAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() reqNew: any): Promise<GenericResponse> {
        return await this.comunasService.new(reqNew);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:codigo")
    async edit(@Body() reqEdit: any, @Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunasService.edit(reqEdit, codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete("/:codigo")
    async delete(@Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunasService.delete(codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/findByFilter")
    async findByFilter(@Body() reqFindByFilter: any): Promise<GenericResponse> {
        return await this.comunasService.findByFilter(reqFindByFilter);
    }

}