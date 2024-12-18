import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { GenericResponse } from "../dto/GenericResponse.dto";
import { RolPermisoService } from "../service/rol.permiso.service";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("rol-permiso")
@Controller('/rol-permiso')
export class RolPermisoController {

    constructor(private rolPermisoService: RolPermisoService) { }

    //@UseGuards(JwtAuthGuard)
    @Post("/:idrol")
    async new(@Body() req: any, @Param("idrol", ParseIntPipe) idRol: number): Promise<GenericResponse> {
        return await this.rolPermisoService.rolPermiso(req, idRol);
    }

}