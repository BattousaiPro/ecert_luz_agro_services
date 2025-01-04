import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { GenericResponse } from '../vo/GenericResponse';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let jwtPayload;
  let resp: GenericResponse = new GenericResponse();
  const tokenIn = <string>req.headers['authorization'];
  // console.log('req.headers: ' + JSON.stringify(req.headers));
  // console.log('tokenIn: ' + JSON.stringify(tokenIn));
  if (!tokenIn) {
    resp.code = '-98';
    resp.message = 'Sin Token.';
    resp.data = null;
    return res.status(401).send(resp);
  }

  const [type, token] = tokenIn.split(' ');
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    // console.log('jwtPayload: ' + JSON.stringify(jwtPayload));
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    console.log('error de verify');
    resp.code = '-99';
    resp.message = 'Usuario No autoriado para esta acción!';
    resp.data = null;
    return res.status(401).send(resp);
  }

  const { userId, username } = jwtPayload;

  const newToken = jwt.sign({ userId, username }, config.jwtSecret, { expiresIn: '1h' });
  res.setHeader('token', newToken);
  // Call next
  next();
};
