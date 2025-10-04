import { Request, Response } from 'express';
import sequelize from '../config/db';
import User from '../model/User';
import { IUserUpdated } from '../types/user';

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  console.log('Solicitud recibida en /api/users');
  try {
    const users = await User.findAll();
    console.log('Usuarios obtenidos:', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Crear un nuevo usuario
export const postUser = async (req: Request, res: Response): Promise<void> => {
  const t = await sequelize.transaction();
  const {
    nombre,
    tipo,
    password,
    telefono,
    direccion,
    ubicacion,
    descripcion,
    web,
    redes_sociales,
  } = req.body;

  try {
    const newUser = await User.create(
      {
        nombre,
        tipo,
        password,
        telefono,
        direccion,
        ubicacion,
        descripcion,
        web,
        redes_sociales,
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json(newUser);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Actualizar un usuario
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const t = await sequelize.transaction();
  const { id } = req.params;
  const {
    nombre,
    tipo,
    password,
    telefono,
    direccion,
    ubicacion,
    descripcion,
    web,
    redes_sociales,
  } = req.body;

  try {
    const user = await User.findByPk(id, { transaction: t });
    if (!user) {
      await t.rollback();
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    const updatedUser: IUserUpdated = {
      nombre: nombre || user.nombre,
      tipo: tipo || user.tipo,
      password: password || user.password,
    };

    if (telefono !== undefined) updatedUser.telefono = telefono;
    if (direccion !== undefined) updatedUser.direccion = direccion;
    if (ubicacion !== undefined) updatedUser.ubicacion = ubicacion;
    if (descripcion !== undefined) updatedUser.descripcion = descripcion;
    if (web !== undefined) updatedUser.web = web;
    if (redes_sociales !== undefined)
      updatedUser.redes_sociales = redes_sociales;

    await user.update(updatedUser, { transaction: t });

    await t.commit();
    res.status(200).json(user);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const t = await sequelize.transaction();
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, { transaction: t });
    if (!user) {
      await t.rollback();
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    await user.destroy({ transaction: t });

    await t.commit();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};
