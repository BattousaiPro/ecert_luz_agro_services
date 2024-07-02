import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { GenericResponse } from '../vo/GenericResponse';

export const checkJwt = (req: Request, res: Response) => {
  const token = <string>req.headers['auth'];
  let jwtPayload;
  let resp: GenericResponse = new GenericResponse();

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    resp.code = '-99';
    resp.message = 'Usuario No autoriado para esta acción!';
    resp.data = null;
    return res.status(200).send(resp);
    //return res.status(401).json({ message: 'Not Authorized' });
  }

  const { userId, username } = jwtPayload;

  const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
  res.setHeader('token', newToken);
  // Call next
  next();
};
