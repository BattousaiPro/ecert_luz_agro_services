import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { GenericResponse } from "../dto/GenericResponse.dto";
import { PermisoService } from "../service/permiso.service";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("permiso")
@Controller('/permiso')
export class PermisoController {

    constructor(private permisoService: PermisoService) {}

    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll(): Promise<GenericResponse> {
        return await this.permisoService.getAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() reqNew: any): Promise<GenericResponse> {
        return await this.permisoService.new(reqNew);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:id")
    async edit(@Body() reqEdit: any, @Param("id", ParseIntPipe) id: number): Promise<GenericResponse> {
        return await this.permisoService.edit(reqEdit, id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<GenericResponse> {
        return await this.permisoService.delete(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/findByFilter")
    async findByFilter(@Body() reqFindByFilter: any): Promise<GenericResponse> {
        return await this.permisoService.findByFilter(reqFindByFilter);
    }

}