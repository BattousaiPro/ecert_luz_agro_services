import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { UserRolService } from "../service/user.rol.service";
import { GenericResponse } from "../dto/GenericResponse.dto";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("'user-rol'")
@Controller('/user-rol')
export class UserRolController {

    constructor(private userRolService: UserRolService) { }

    //@UseGuards(JwtAuthGuard)
    @Post("/:iduser")
    async new(@Body() req: any, @Param("iduser", ParseIntPipe) idUser: number): Promise<GenericResponse> {
        return await this.userRolService.userRol(req, idUser);
    }

}