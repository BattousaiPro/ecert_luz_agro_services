import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { GenericResponse } from "../dto/GenericResponse.dto";
import { RolService } from "../service/rol.service";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("rol")
@Controller('/rol')
export class RolController {

    constructor(private rolService: RolService) {}

    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll(): Promise<GenericResponse> {
        return await this.rolService.getAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() reqNew: any): Promise<GenericResponse> {
        return await this.rolService.new(reqNew);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:id")
    async edit(@Body() reqEdit: any, @Param("id", ParseIntPipe) id: number): Promise<GenericResponse> {
        return await this.rolService.edit(reqEdit, id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<GenericResponse> {
        return await this.rolService.delete(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/findByFilter")
    async findByFilter(@Body() reqFindByFilter: any): Promise<GenericResponse> {
        return await this.rolService.findByFilter(reqFindByFilter);
    }

}