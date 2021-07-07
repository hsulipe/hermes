import { Request, Response, NextFunction } from 'express';
import AppError from '../../../shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
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
      return next();
    }
    catch (err) {
      throw new AppError('Invalid jwt token.', 401);
    }
}
