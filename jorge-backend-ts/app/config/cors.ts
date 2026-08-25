import { CorsOptions } from 'cors';

const DEV_ORIGINS = ['http://localhost:5173', 'http://localhost:5174'];

/** "https://a.com, https://b.com" -> ['https://a.com', 'https://b.com'] */
const parseOrigins = (raw: string | undefined): string[] =>
  (raw ?? '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

const configured = parseOrigins(process.env.CORS_ORIGINS);

// Si no se configura nada, solo se permite el front en local.
const whiteList = configured.length > 0 ? configured : DEV_ORIGINS;

/**
 * Permite comodín de subdominio para los preview de Vercel, cuya URL cambia
 * en cada despliegue: CORS_ORIGINS=https://*.vercel.app
 */
const matchesOrigin = (origin: string): boolean => {
  const clean = origin.replace(/\/+$/, '');

  return whiteList.some((allowed) => {
    if (!allowed.includes('*')) return allowed === clean;

    const pattern = new RegExp(
      `^${allowed.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^.]+')}$`
    );
    return pattern.test(clean);
  });
};

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Sin Origin = misma máquina o cliente no navegador (curl, Postman, healthcheck).
    if (!origin || matchesOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  credentials: true,
};

export default corsOptions;
