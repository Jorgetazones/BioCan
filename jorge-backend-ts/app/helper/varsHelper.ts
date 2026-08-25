import { config } from 'dotenv';

// Solo carga el .env una vez. En producción (Railway, Render...) no hay fichero
// .env y las variables llegan ya inyectadas en el entorno: dotenv no las pisa.
config();

/** Primer valor no vacío de la lista. */
const firstOf = (...values: (string | undefined)[]): string =>
  values.find((value) => value !== undefined && value.trim() !== '')?.trim() ??
  '';

export const getEnvVariables = () => {
  // Railway inyecta MYSQLHOST, MYSQLUSER, etc. al enlazar el servicio MySQL.
  // Se aceptan ambos nombres para no tener que duplicar variables a mano.
  const DB_HOST = firstOf(process.env.DB_HOST, process.env.MYSQLHOST);
  const DB_DATABASE = firstOf(
    process.env.DB_DATABASE,
    process.env.MYSQLDATABASE
  );
  const DB_PORT = firstOf(
    process.env.DB_PORT,
    process.env.MYSQLPORT,
    '3306'
  );
  const DB_USERNAME = firstOf(
    process.env.DB_USERNAME,
    process.env.MYSQLUSER,
    'root'
  );
  const DB_PASSWORD = firstOf(
    process.env.DB_PASSWORD,
    process.env.MYSQLPASSWORD
  );

  const missing = Object.entries({
    DB_HOST,
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
  })
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno para la base de datos: ${missing.join(', ')}`
    );
  }

  return { DB_HOST, DB_DATABASE, DB_PORT, DB_USERNAME, DB_PASSWORD };
};

/**
 * Secreto para firmar los JWT. Falla al arrancar y no en el primer login,
 * que es cuando duele. Nunca debe tener valor por defecto.
 */
export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.trim() === '') {
    throw new Error('Falta la variable de entorno JWT_SECRET.');
  }

  return secret;
};
