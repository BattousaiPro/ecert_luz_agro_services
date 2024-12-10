import { Module } from "@nestjs/common";
import { ComunaModule } from "./modules/comuna.module";
import { SectorModule } from "./modules/sector.module";
import { PermisoModule } from "./modules/permiso.module";

@Module({
  imports: [
    ComunaModule,
    SectorModule,
    PermisoModule,
  ],
})
export class ApiModule { }
