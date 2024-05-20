import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "./entity/Usuarios";
import { Roles } from "./entity/Roles";
import { Permisos } from "./entity/Permisos";
import { Comunas } from "./entity/Comunas";
import { Sector } from "./entity/Sector";
import { TipCte } from "./entity/TipCte";
import { Ejemplo } from "./entity/Ejemplo";
import { Kapmae } from "./entity/Kapmae";

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
        Ejemplo,
        Usuarios,
        Roles,
        Permisos,
        Comunas,
        Sector,
        TipCte,
        Kapmae,
    ],
    migrations: [],
    subscribers: [],
})
