import { Sequelize } from 'sequelize-typescript';
import { getEnvVariables } from '../helper/varsHelper';
import Multimedia from '../model/Multimedia';
import OrderDetails from '../model/OrderDetails';
import Orders from '../model/Orders';
import Product from '../model/Product';
import Ratings from '../model/Ratings';
import User from '../model/User';

const { DB_USERNAME, DB_PORT, DB_DATABASE, DB_PASSWORD, DB_HOST } =
  getEnvVariables();

const isProduction = process.env.NODE_ENV === 'production';

const db = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  models: [User, Product, OrderDetails, Orders, Multimedia, Ratings],
  // En producción cada query en el log llena el cuadro de mandos de ruido.
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  // MySQL gestionada expuesta por internet suele exigir TLS.
  dialectOptions:
    process.env.DB_SSL === 'true'
      ? { ssl: { rejectUnauthorized: false } }
      : {},
  pool: { max: isProduction ? 10 : 5, min: 0, idle: 10000, acquire: 30000 },
});

export async function connectToDatabase(): Promise<void> {
  try {
    await db.authenticate();
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    throw error;
  }
}

export async function syncDatabase(): Promise<void> {
  try {
    await db.sync();
    console.log('Modelos sincronizados correctamente.');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error);
    throw error;
  }
}

export default db;
