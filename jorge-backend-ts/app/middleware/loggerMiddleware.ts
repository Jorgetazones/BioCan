import morgan from 'morgan';
import logger from '../utils/logger';

// Creamos un stream personalizado para que Morgan use Winston
const stream = {
  write: (message: string) => {
    logger.info(message.trim()); // usamos .info para que vaya a info.log
  },
};

// Opcional: sólo loguear en producción si lo deseas
const skip = () => {
  return process.env.NODE_ENV === 'test';
};

// Middleware configurado
const morganMiddleware = morgan('combined', { stream, skip });

export default morganMiddleware;
