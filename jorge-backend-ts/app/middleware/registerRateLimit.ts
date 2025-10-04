import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // máximo 5 registros por IP en una hora
  message: {
    error: 'Demasiados intentos de registro. Intenta de nuevo en una hora.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`Límite de intentos alcanzado para IP: ${req.ip}`);
    res.status(429).json({
      error: 'Demasiados intentos de registro. Intenta de nuevo en una hora.',
    });
  },
});

export default registerLimiter;
