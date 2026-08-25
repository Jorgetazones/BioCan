import { CookieOptions } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Opciones de la cookie de sesión.
 *
 * Con el front y la API en dominios distintos (Vercel + Railway) la petición es
 * cross-site, y el navegador solo manda la cookie con SameSite=None. Con
 * SameSite=Strict el login responde 200 y luego todo da 401, porque la cookie
 * jamás se envía. SameSite=None obliga además a Secure (solo HTTPS).
 *
 * Si algún día front y API comparten dominio (api.biocan.es + biocan.es),
 * pon CROSS_SITE_COOKIES=false para volver a 'lax', que es más restrictivo.
 */
const crossSite = process.env.CROSS_SITE_COOKIES !== 'false';

export const AUTH_COOKIE_NAME = 'token';

export const AUTH_COOKIE_MAX_AGE = 24 * 60 * 60 * 1000; // 1 día

/**
 * clearCookie solo borra la cookie si recibe las mismas opciones con las que se
 * creó, así que login y logout comparten esta única fuente de verdad.
 */
export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction && crossSite ? 'none' : 'lax',
  path: '/',
};
