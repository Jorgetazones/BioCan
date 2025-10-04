import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';

import corsOptions from './config/cors';
import { connectToDatabase, syncDatabase } from './config/db';
import morganMiddleware from './middleware/loggerMiddleware';
import limiter from './middleware/rateLimitMiddleware';
import registerLimiter from './middleware/registerRateLimit';
import authRoutes from './routes/authRoutes';
import multimediaRouts from './routes/multimediaRoutes';
import orderDetailsRoutes from './routes/orderDetailsRoutes';
import ordersRoutes from './routes/ordersRoutes';
import productsRoutes from './routes/productRoutes';
import ratingsRoutes from './routes/ratingRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './utils/errorHandler';
import logger from './utils/logger';
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./app/docs/swagger.yaml');

const app = express();
const PORT = 3000;
// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

app.use(
  '/uploads',
  cors(corsOptions),
  express.static(path.resolve(__dirname, 'uploads'))
);
app.use(limiter);

app.use(morganMiddleware);

// Rutas API
app.use('/api/users', userRoutes, registerLimiter);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order-details', orderDetailsRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/multimedia', multimediaRouts);

app.use(errorHandler);

// Iniciar servidor

(async () => {
  try {
    await connectToDatabase();
    await syncDatabase();
    app.listen(PORT, () => {
      logger.info('Welcome to Biocan backend');
      logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Error en la inicialización de la aplicación:', error);
    process.exit(1);
  }
})();

export default app;
