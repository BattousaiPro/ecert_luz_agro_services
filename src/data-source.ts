import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "./modulos/users/entities/Usuarios";
import { Roles } from "./modulos/roles/entities/Roles";
import { Permisos } from "./modulos/permisos/entities/Permisos";
import { Comunas } from "./modulos/comunas/entities/Comunas";
import { Sector } from "./modulos/sector/entities/Sector";
import { Kapmae } from "./modulos/kapmae/entities/Kapmae";

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
    ],
    migrations: [],
    subscribers: [],
})
