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

const host_bd_Env = process.env.HOST_BD_ENV || '82.197.82.107';                   // 'localhost';
const username_bd_Env = process.env.USERNAME_BD_ENV || 'u134865480_dev_root';     // 'test';
const password_bd_Env = process.env.PASSWORD_BD_ENV || 'Ge5]Kj2i?nA';             // 'test';
const database_bd_Env = process.env.DATABASE_BD_ENV || 'u134865480_Test_Agro_BD'; // 'test';
const port_bd_Env: number = <number>(process.env.PORT_BD_ENV || 3306);
const synchronize_bd_Env: boolean = <boolean>(process.env.SYNCHRONIZE_BD_ENV || false);
const logging_bd_Env: boolean = <boolean>(process.env.LOGGING_BD_ENV || false);

// console.log(`Server date host_bd_Env: ${host_bd_Env}`);
// console.log(`Server date username_bd_Env: ${username_bd_Env}`);
// console.log(`Server date password_bd_Env: ${password_bd_Env}`);
// console.log(`Server date database_bd_Env: ${database_bd_Env}`);
// console.log(`Server date port_bd_Env: ${port_bd_Env}`);
// console.log(`Server date synchronize_bd_Env: ${synchronize_bd_Env}`);
// console.log(`Server date logging_bd_Env: ${logging_bd_Env}`);

export const AppDataSource = new DataSource({
    host: host_bd_Env,
    username: username_bd_Env,
    password: password_bd_Env,
    database: database_bd_Env,
    port: port_bd_Env,
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
