import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';
import { PROJECT_ROOT } from '../config/paths';

const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// En un PaaS el disco es efímero y los logs se leen por stdout: la consola es
// el transporte imprescindible. Los ficheros se activan con LOG_TO_FILE=true.
const logTransports: NonNullable<
  Parameters<typeof createLogger>[0]
>['transports'] = [
  new transports.Console({
    format: combine(colorize({ level: true }), logFormat),
  }),
];

if (process.env.LOG_TO_FILE === 'true') {
  const logsDir = path.join(PROJECT_ROOT, 'logs');
  // Winston no crea el directorio: si no existe, revienta al primer log.
  fs.mkdirSync(logsDir, { recursive: true });

  const fileOptions = {
    maxsize: 1024 * 1024 * 5,
    maxFiles: 5,
    zippedArchive: true,
  };

  logTransports.push(
    new transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      ...fileOptions,
    }),
    new transports.File({
      filename: path.join(logsDir, 'info.log'),
      level: 'info',
      ...fileOptions,
    })
  );
}

const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: logTransports,
});

export default logger;
