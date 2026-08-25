import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME } from '../config/cookies';
import { getJwtSecret } from '../helper/varsHelper';

interface JwtPayload {
  id: number;
  username: string;
  tipo: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (!token) {
    res.status(401).json({ message: 'No autenticado' });
    return;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
