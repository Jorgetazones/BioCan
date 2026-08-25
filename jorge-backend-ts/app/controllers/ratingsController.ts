import { Request, Response } from 'express';
import Ratings from '../model/Ratings';

// Crear una nueva calificación
export const createRating = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { agricultor_id, comprador_id, pedido_id, puntuacion, comentario } =
      req.body;

    const newRating = await Ratings.create({
      agricultor_id,
      comprador_id,
      pedido_id,
      puntuacion,
      comentario,
    });

    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear calificación' });
  }
};

// Obtener calificaciones por agricultor
export const getRatingsByAgricultor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { agricultorId } = req.params;

    const ratings = await Ratings.findAll({
      where: { agricultor_id: agricultorId },
    });

    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener Ratings' });
  }
};

// Obtener calificaciones por comprador
export const getRatingsByComprador = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { compradorId } = req.params;

    const ratings = await Ratings.findAll({
      where: { comprador_id: compradorId },
    });

    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener Ratings' });
  }
};
