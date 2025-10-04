import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 1024 * 1024 * 5,
      maxFiles: 5,
      zippedArchive: true,
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      maxsize: 1024 * 1024 * 5,
      maxFiles: 5,
      zippedArchive: true,
    }),
  ],
});

export default logger;
