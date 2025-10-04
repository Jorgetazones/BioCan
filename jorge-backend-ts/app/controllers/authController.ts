import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import logger from '../utils/logger';

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { nombre: username } });

    if (!user) {
      const error = new Error('Usuario no encontrado');
      logger.warn(
        `Intento de inicio de sesión fallido: Usuario no encontrado (${username})`
      );
      res.status(401).json({ message: error.message });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Contraseña incorrecta');
      logger.warn(
        `Intento de inicio de sesión fallido: Contraseña incorrecta (${username})`
      );
      res.status(401).json({ message: error.message });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.nombre,
        tipo: user.tipo,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      path: '/',
    });

    logger.info(`Usuario ${username} inició sesión correctamente`);
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user.id,
        username: user.nombre,
        tipo: user.tipo,
        ubicacion: user.ubicacion,
        direccion: user.direccion,
        telefono: user.telefono,
        web: user.web,
      },
    });
  } catch (error) {
    logger.error(`Error al iniciar sesión para el usuario ${username}:`, error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
    });
    logger.info('Cookie eliminada y sesión cerrada correctamente');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    logger.error('Error al cerrar sesión:', error);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};
