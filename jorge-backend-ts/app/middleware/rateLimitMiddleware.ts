import rateLimit from 'express-rate-limit';

// Límite general: 100 peticiones por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true, // Usa headers estándar
  legacyHeaders: false, // Desactiva headers obsoletos
});

export default limiter;
