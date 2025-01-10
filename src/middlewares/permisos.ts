import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { GenericResponse } from '../vo/GenericResponse';
import { AppDataSource } from '../data-source';
import { Usuarios } from '../entity/Usuarios';

export const checkPermisos = (permisos: Array<string>) => {

  return async (req: Request, response: Response, next: NextFunction) => {
    /*
    let resp: GenericResponse = new GenericResponse();
    const { userId } = response.locals.jwtPayload;
    let isValidPermis: boolean = false;
    const userRepository = AppDataSource.getRepository(Usuarios);
    let user: Usuarios;

    try {
      user = await userRepository.findOneOrFail({
        where: { id: userId },
        relations: {
          roles: {
            permisos: true,
          }
        }
      });
    } catch (e) {
      //console.log(JSON.stringify(e));
      resp.code = '98';
      resp.message = 'Usuario no existe, No Autenticado!';
      resp.data = null;
      return response.status(200).send(resp);
    }

    // Obtener la lista de permisos según al listado de roles.
    let permisosBack: string[] = [];
    const { roles } = user;
    for (const key in roles) {
      if (Object.prototype.hasOwnProperty.call(roles, key)) {
        const itemRol = roles[key];
        for (const key in itemRol.permisos) {
          if (Object.prototype.hasOwnProperty.call(itemRol.permisos, key)) {
            const element = itemRol.permisos[key];
            permisosBack.push(element.code);
          }
        }
      }
    }
    permisosBack.push(...permisosBack);
    const uniqueArr = [];
    permisosBack.forEach((item) => {
      if (!uniqueArr.includes(item)) {
        uniqueArr.push(item);
      }
    })
    permisosBack = [];
    permisosBack.push(...uniqueArr);
    permisosBack.sort();
    for (let index = 0; index < permisos.length; index++) {
      const element = permisos[index];
      if (permisosBack.includes(element)) {
        isValidPermis = true;
        break;
      }
    }
    //Check
    if (!isValidPermis) {
      resp.code = '99';
      resp.message = 'No Autenticado!';
      resp.data = null;
      return response.status(200).send(resp);
    }
    */
    // Call next
    next();
  };

};
