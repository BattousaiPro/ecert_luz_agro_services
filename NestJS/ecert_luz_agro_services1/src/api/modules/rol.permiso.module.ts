import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolPermisoController } from "../controller/rol.permiso.controller";
import { RolPermisoService } from "../service/rol.permiso.service";
import { RolPermiso } from "../entity/rol.permiso.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RolPermiso])],
  controllers: [RolPermisoController],
  providers: [RolPermisoService],
  exports: [RolPermisoService],
})
export class RolPermisoModule {}
