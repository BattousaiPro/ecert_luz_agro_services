import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ComunaService } from "../service/comuna.service";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { GenericResponse } from "../dto/GenericResponse.dto";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("comuna")
@Controller('/comuna')
export class ComunaController {

    constructor(private comunaService: ComunaService) {}

    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll(): Promise<GenericResponse> {
        return await this.comunaService.getAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() reqNew: any): Promise<GenericResponse> {
        return await this.comunaService.new(reqNew);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:codigo")
    async edit(@Body() reqEdit: any, @Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunaService.edit(reqEdit, codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete("/:codigo")
    async delete(@Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunaService.delete(codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/findByFilter")
    async findByFilter(@Body() reqFindByFilter: any): Promise<GenericResponse> {
        return await this.comunaService.findByFilter(reqFindByFilter);
    }

}