import jwt, { SignOptions } from 'jsonwebtoken';
import { getJwtSecret } from '../helper/varsHelper';

/**
 * Al venir de una variable de entorno, TypeScript no puede validar el formato
 * de `ms` ('1d', '15m'...) que exige SignOptions, de ahí la aserción.
 */
export const JWT_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) ?? '1d';

export const generateToken = (user: {
  id: number;
  username: string;
  tipo: string;
}) => {
  // Sin expiresIn el token vale para siempre: si alguien lo roba, no caduca nunca.
  return jwt.sign(user, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
};
