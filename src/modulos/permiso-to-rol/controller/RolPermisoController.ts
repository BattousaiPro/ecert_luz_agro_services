import { AppDataSource } from "../../../data-source";
import { RolPermiso } from "../entities/RolPermiso";

export class RolPermisoController {

    private repository = AppDataSource.getRepository(RolPermiso);

}