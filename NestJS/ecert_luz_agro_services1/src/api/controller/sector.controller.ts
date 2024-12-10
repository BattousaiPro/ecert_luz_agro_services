import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { SectorService } from "../service/sector.service";
import { GenericResponse } from "../dto/GenericResponse.dto";

//@ApiSecurity("Bearer")
//@ApiBearerAuth()
@ApiTags("sector")
@Controller('/sector')
export class SectorController {

    constructor(private sectorService: SectorService) {}

    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll(): Promise<GenericResponse> {
        return await this.sectorService.getAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() reqNew: any): Promise<GenericResponse> {
        return await this.sectorService.new(reqNew);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:codigo")
    async edit(@Body() reqEdit: any, @Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.sectorService.edit(reqEdit, codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete("/:codigo")
    async delete(@Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.sectorService.delete(codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/findByFilter")
    async findByFilter(@Body() reqFindByFilter: any): Promise<GenericResponse> {
        return await this.sectorService.findByFilter(reqFindByFilter);
    }

}