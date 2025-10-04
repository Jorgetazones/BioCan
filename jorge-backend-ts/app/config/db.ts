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

const db = new Sequelize({
  dialect: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  models: [User, Product, OrderDetails, Orders, Multimedia, Ratings],
  logging: true, // Cambia a false en producción para evitar logs excesivos
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
