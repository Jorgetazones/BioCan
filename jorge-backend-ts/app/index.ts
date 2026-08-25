import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import corsOptions from './config/cors';
import { connectToDatabase, syncDatabase } from './config/db';
import { ensureUploadsDir, SWAGGER_FILE, UPLOADS_DIR } from './config/paths';
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

const app = express();

// El PaaS decide el puerto y lo inyecta por entorno; si no se respeta, el
// healthcheck no encuentra la app y el despliegue se marca como fallido.
const PORT = parseInt(process.env.PORT ?? '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

// Detrás del proxy del PaaS todas las peticiones llegan con la misma IP: sin
// esto el rate limit trata a todos los usuarios como uno solo (y express-rate-limit
// v7 protesta al ver X-Forwarded-For sin trust proxy configurado).
if (isProduction) {
  app.set('trust proxy', 1);
}

// Middleware
// El yaml de Swagger no lo copia tsc a dist/: si falta, la doc se desactiva
// pero la API sigue arrancando.
try {
  const swaggerDocument = YAML.load(SWAGGER_FILE);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  logger.warn(
    `No se pudo cargar la documentación Swagger desde ${SWAGGER_FILE}: ${
      (error as Error).message
    }`
  );
}

app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json());
app.use(cors(corsOptions));

ensureUploadsDir();
app.use('/uploads', cors(corsOptions), express.static(UPLOADS_DIR));

// Antes del rate limit: el healthcheck del PaaS consume cuota si no.
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

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

    // DB_SYNC=false para no dejar que Sequelize toque el esquema en producción.
    if (process.env.DB_SYNC !== 'false') {
      await syncDatabase();
    }

    // 0.0.0.0 y no localhost: en un contenedor, escuchar solo en loopback deja
    // la app inalcanzable desde fuera.
    app.listen(PORT, '0.0.0.0', () => {
      logger.info('Welcome to Biocan backend');
      logger.info(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    logger.error('Error en la inicialización de la aplicación:', error);
    process.exit(1);
  }
})();

export default app;
