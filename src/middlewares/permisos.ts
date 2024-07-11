import { getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { GenericResponse } from '../vo/GenericResponse';
import { AppDataSource } from '../data-source';
import { Usuarios } from '../entity/Usuarios';

export const checkPermisos = (permisos: Array<string>) => {

  return async (req: Request, response: Response, next: NextFunction) => {
    let resp: GenericResponse = new GenericResponse();
    const { userId } = response.locals.jwtPayload;
    let isValidPermis: boolean = false;
    const userRepository = AppDataSource.getRepository(Usuarios);
    let user: Usuarios;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      //console.log(JSON.stringify(e));
      resp.code = '98';
      resp.message = 'No Autenticado!';
      resp.data = null;
      return response.status(200).send(resp);
    }

    // Obtener la lista de permisos según al listado de roles.
    let permisosBack: string[] = [];

    // TODO: validar la lista de permisos de entrada con la obtenida desde BBDD.
    isValidPermis = true;

    //Check
    const { roles } = user;
    if (isValidPermis) {
      next();
    } else {
      resp.code = '99';
      resp.message = 'No Autenticado!';
      resp.data = null;
      return response.status(200).send(resp);
    }
  };

};
