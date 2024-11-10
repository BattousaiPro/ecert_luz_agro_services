import "reflect-metadata";
import { DataSource } from "typeorm";

//import { Usuarios } from "./entity/Usuarios";
//import { Roles } from "./entity/Roles";
//import { Permisos } from "./entity/Permisos";
import { Comunas } from "./entity/Comunas";
//import { Sector } from "./entity/Sector";
//import { Kapmae } from "./entity/Kapmae";
//import { RolPermiso } from "./entity/RolPermiso";
//import { UserRol } from "./entity/UserRol";

const host_bd_Env = process.env.HOST_BD_ENV || 'localhost';
const username_bd_Env = process.env.USERNAME_BD_ENV || 'test';
const password_bd_Env = process.env.PASSWORD_BD_ENV || 'test';
const database_bd_Env = process.env.DATABASE_BD_ENV || 'test';
const port_bd_Env: number = <number>(process.env.PORT_BD_ENV || 3306);
const synchronize_bd_Env: boolean = <boolean>(process.env.SYNCHRONIZE_BD_ENV || false);
const logging_bd_Env: boolean = <boolean>(process.env.LOGGING_BD_ENV || false);

export const AppDataSource = new DataSource({
    host: host_bd_Env,
    username: username_bd_Env,
    password: password_bd_Env,
    database: database_bd_Env,
    port: port_bd_Env,
    type: "mysql",
    synchronize: synchronize_bd_Env,
    logging: logging_bd_Env,
    entities: [
        //Usuarios,
        //Roles,
        //Permisos,
        Comunas,
        //Sector,
        //Kapmae,
        //RolPermiso,
        //UserRol,
    ],
    migrations: [],
    subscribers: [],
})
