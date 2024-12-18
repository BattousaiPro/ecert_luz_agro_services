import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRol } from "../entity/user.rol.entity";
import { UserRolController } from "../controller/user.rol.controller";
import { UserRolService } from "../service/user.rol.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserRol])],
  controllers: [UserRolController],
  providers: [UserRolService],
  exports: [UserRolService],
})
export class UserRolModule {}
