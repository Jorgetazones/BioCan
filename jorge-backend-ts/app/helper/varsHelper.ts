import { config } from 'dotenv';

export const getEnvVariables = () => {
  config();

  const DB_HOST = process.env.DB_HOST ?? '';
  const DB_DATABASE = process.env.DB_DATABASE ?? '';
  const DB_PORT = process.env.DB_PORT ?? '3306';
  const DB_USERNAME = process.env.DB_USERNAME ?? 'root';
  const DB_PASSWORD = process.env.DB_PASSWORD ?? '';

  // Verifica que las variables esenciales estén presentes
  if (!DB_HOST || !DB_DATABASE || !DB_USERNAME || !DB_PASSWORD) {
    throw new Error(
      'Faltan variables de entorno necesarias para la base de datos.'
    );
  }

  return {
    DB_HOST,
    DB_DATABASE,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
  };
};
