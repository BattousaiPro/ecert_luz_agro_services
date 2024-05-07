import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Roles } from "./entity/Roles";
import { Permisos } from "./entity/Permisos";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Roles, Permisos, Comunas],
    migrations: [],
    subscribers: [],
})
