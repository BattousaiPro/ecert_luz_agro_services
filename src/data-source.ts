import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Roles } from "./entity/Roles";
import { Permisos } from "./entity/Permisos";
import { Comunas } from "./entity/Comunas";
import { Sector } from "./entity/Sector";
import { TipCte } from "./entity/TipCte";

export const AppDataSource = new DataSource({
    host: "localhost",
    username: "test",
    password: "test",
    database: "test",
    type: "mysql",
    port: 3306,
    synchronize: false,
    logging: false,
    entities: [User, Roles, Permisos, Comunas, Sector, TipCte],
    migrations: [],
    subscribers: [],
})
