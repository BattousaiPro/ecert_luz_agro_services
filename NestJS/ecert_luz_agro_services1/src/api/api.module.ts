import { Module } from "@nestjs/common";
import { ComunaModule } from "./modules/comuna.module";
import { SectorModule } from "./modules/sector.module";
import { PermisoModule } from "./modules/permiso.module";
import { RolModule } from "./modules/rol.module";
import { UserModule } from "./modules/user.module";
import { UserRolModule } from "./modules/user.rol.module";
import { RolPermisoModule } from "./modules/rol.permiso.module";

@Module({
  imports: [
    ComunaModule,
    SectorModule,
    PermisoModule,
    RolModule,
    UserModule,
    UserRolModule,
    RolPermisoModule,
  ],
})
export class ApiModule { }
