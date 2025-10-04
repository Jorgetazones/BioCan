import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`${req.method} ${req.originalUrl} -> ${err.message}`, {
    stack: err.stack,
    status: err.status || 500 || 401,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  res.status(err.status || 500).json({ error: 'Ha ocurrido un error interno' });
};

export default errorHandler;
