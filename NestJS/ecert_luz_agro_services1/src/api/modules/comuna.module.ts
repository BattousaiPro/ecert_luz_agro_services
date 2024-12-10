import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComunaController } from "../controller/comuna.controller";
import { ComunaService } from "../service/comuna.service";
import { Comuna } from "../entity/comuna.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comuna])],
  controllers: [ComunaController],
  providers: [ComunaService],
  exports: [ComunaService],
})
export class ComunaModule {}
