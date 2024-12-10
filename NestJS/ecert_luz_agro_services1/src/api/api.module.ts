import { Module } from "@nestjs/common";
import { ComunaModule } from "./modules/comuna.module";
import { SectorModule } from "./modules/sector.module";

@Module({
  imports: [
    ComunaModule,
    SectorModule,
  ],
})
export class ApiModule { }
