import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "./entity/Usuarios";
import { Roles } from "./entity/Roles";
import { Permisos } from "./entity/Permisos";
import { Comunas } from "./entity/Comunas";
import { Sector } from "./entity/Sector";
import { Kapmae } from "./entity/Kapmae";
import { RolPermiso } from "./entity/RolPermiso";
import { UserRol } from "./entity/UserRol";

export const AppDataSource = new DataSource({
    host: "localhost",
    username: "test",
    password: "test",
    database: "test",
    port: 3306,
    type: "mysql",
    synchronize: false,
    logging: false,
    entities: [
        Usuarios,
        Roles,
        Permisos,
        Comunas,
        Sector,
        Kapmae,
        RolPermiso,
        UserRol,
    ],
    migrations: [],
    subscribers: [],
})
