import { AppDataSource } from "../../../data-source";
import { UserRol } from "../entities/UserRol";

export class UserRolController {

    private repository = AppDataSource.getRepository(UserRol);

}