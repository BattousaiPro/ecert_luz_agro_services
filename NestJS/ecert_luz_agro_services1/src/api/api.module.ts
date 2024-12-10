import { Module } from "@nestjs/common";
import { ComunaModule } from "./modules/comuna.module";
import { SectorModule } from "./modules/sector.module";
import { PermisoModule } from "./modules/permiso.module";
import { RolModule } from "./modules/rol.module";

@Module({
  imports: [
    ComunaModule,
    SectorModule,
    PermisoModule,
    RolModule,
  ],
})
export class ApiModule { }
