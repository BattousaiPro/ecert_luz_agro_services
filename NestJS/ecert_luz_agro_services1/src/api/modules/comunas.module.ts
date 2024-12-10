import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComunasController } from "../controller/comunas.controller";
import { ComunasService } from "../service/comunas.service";
import { Comunas } from "../entity/comunas.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comunas])],
  controllers: [ComunasController],
  providers: [ComunasService],
  exports: [ComunasService],
})
export class ComunasModule {}
