import { Request, Response } from 'express';
import sequelize from '../config/db';
import Multimedia from '../model/Multimedia';

// Crear multimedia
export const createMultimedia = async (
  req: Request,
  res: Response
): Promise<void> => {
  const t = await sequelize.transaction();
  try {
    const { producto_id, tipo } = req.body;

    if (!req.file) {
      res
        .status(400)
        .json({ message: 'No se recibió la imagen correctamente' });
      return;
    }

    const url = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`;

    const newMultimedia = await Multimedia.create(
      {
        producto_id,
        url: req.file.filename,
        tipo,
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json(newMultimedia);
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error al crear multimedia' });
  }
};

// Obtener multimedia por producto
export const getMultimediaByProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;

    const multimedia = await Multimedia.findAll({
      where: { producto_id: productId },
    });

    res.status(200).json(multimedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener multimedia' });
  }
};

// Eliminar multimedia
export const deleteMultimedia = async (
  req: Request,
  res: Response
): Promise<void> => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const multimedia = await Multimedia.destroy({
      where: { id },
      transaction: t,
    });

    if (!multimedia) {
      await t.rollback();
      res.status(404).json({ message: 'Multimedia no encontrada' });
      return;
    }

    await t.commit();
    res.status(200).json({ message: 'Multimedia eliminada' });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar multimedia' });
  }
};
