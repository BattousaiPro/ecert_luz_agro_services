import { Module } from "@nestjs/common";
import { ComunasModule } from "./modules/comunas.module";

@Module({
  imports: [
    ComunasModule
  ],
})
export class ApiModule { }
