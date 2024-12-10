import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Permiso } from "../entity/permiso.entity";
import { PermisoController } from "../controller/permiso.controller";
import { PermisoService } from "../service/permiso.service";

@Module({
  imports: [TypeOrmModule.forFeature([Permiso])],
  controllers: [PermisoController],
  providers: [PermisoService],
  exports: [PermisoService],
})
export class PermisoModule {}
