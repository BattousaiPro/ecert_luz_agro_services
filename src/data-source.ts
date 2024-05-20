import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "./users/entities/Usuarios";
import { Roles } from "./roles/entities/Roles";
import { Permisos } from "./permisos/entities/Permisos";
import { Comunas } from "./comunas/entities/Comunas";
import { Sector } from "./sector/entities/Sector";
import { TipCte } from "./tipCte/entities/TipCte";
import { Ejemplo } from "./ejemplo/entities/Ejemplo";
import { Kapmae } from "./kapmae/entities/Kapmae";

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
