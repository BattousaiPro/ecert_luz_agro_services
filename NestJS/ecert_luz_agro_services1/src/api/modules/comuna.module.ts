import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComunasController } from "../controller/comunas.controller";
import { ComunaService } from "../service/comuna.service";
import { Comuna } from "../entity/comuna.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comuna])],
  controllers: [ComunasController],
  providers: [ComunaService],
  exports: [ComunaService],
})
export class ComunaModule {}
