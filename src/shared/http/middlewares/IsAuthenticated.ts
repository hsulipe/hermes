import { Request, Response, NextFunction, request } from 'express';
import AppError from '../../errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iap: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req : Request,
  res : Response,
  next: NextFunction
  ): void {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
      throw new AppError('Token is missing.', 401);
    }

    const [, token] = authHeader.split(' ')

    try{
      const decodeToken = verify(token, authConfig.jwt.secret);
      const { sub } = decodeToken as ITokenPayload;

      request.user = {
        id: sub,
      }

      return next();
    }
    catch (err) {
      throw new AppError('Invalid jwt token.', 401);
    }
}
