import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, Put, UseGuards, Patch, } from "@nestjs/common";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UserService } from "../service/user.service";
import { JwtAuthGuard } from "../jwt/jwt-auth.guard";
import { GenericResponse } from "../dto/GenericResponse.dto";

@ApiSecurity("Bearer")
@ApiBearerAuth()
@ApiTags("user")
@Controller('/user')
export class UserController {

    constructor(private userService: UserService) {}
/*
    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getById(): Promise<GenericResponse> {
        return await this.userService.getById();
    }*/

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() reqNew: any): Promise<GenericResponse> {
        return await this.userService.new(reqNew);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:id")
    async edit(@Body() reqEdit: any, @Param("id", ParseIntPipe) id: number): Promise<GenericResponse> {
        return await this.userService.edit(reqEdit, id);
    }

    //@UseGuards(JwtAuthGuard)
    @Delete("/:id")
    async delete(@Param("id", ParseIntPipe) id: number): Promise<GenericResponse> {
        return await this.userService.delete(id);
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/findByFilter")
    async findByFilter(@Body() reqFindByFilter: any): Promise<GenericResponse> {
        return await this.userService.findByFilter(reqFindByFilter);
    }

}