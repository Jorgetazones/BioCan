import { Request, Response } from 'express';
import {
  default as OrderDetail,
  default as OrderDetails,
} from '../model/OrderDetails';
import Orders from '../model/Orders';

export const getOrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const detalles = await OrderDetail.findAll();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles de pedidos' });
  }
};

export const getOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const detalle = await OrderDetail.findByPk(req.params.id);
    if (!detalle) res.status(404).json({ error: 'Detalle no encontrado' });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle' });
  }
};

export const postOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await OrderDetail.sequelize?.transaction();
  try {
    const nuevoDetalle = await OrderDetail.create(req.body, { transaction });
    await transaction?.commit();
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    await transaction?.rollback();
    res.status(400).json({ error: 'Error al crear detalle' });
  }
};

export const updateOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await OrderDetail.sequelize?.transaction();
  try {
    const id = req.params.id;
    const [updated] = await OrderDetail.update(req.body, {
      where: { id },
      transaction,
    });
    if (updated) {
      const detalleActualizado = await OrderDetail.findByPk(id, {
        transaction,
      });
      await transaction?.commit();
      res.json(detalleActualizado);
    } else {
      await transaction?.rollback();
      res.status(404).json({ error: 'Detalle no encontrado' });
    }
  } catch (error) {
    await transaction?.rollback();
    res.status(400).json({ error: 'Error al actualizar' });
  }
};

export const deleteOrderDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await OrderDetail.sequelize?.transaction();
  try {
    const deleted = await OrderDetail.destroy({
      where: { id: req.params.id },
      transaction,
    });
    if (deleted) {
      await transaction?.commit();
      res.json({ message: 'Detalle eliminado correctamente' });
    } else {
      await transaction?.rollback();
      res.status(404).json({ error: 'Detalle no encontrado' });
    }
  } catch (error) {
    await transaction?.rollback();
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

export const getOrdersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    const orders = await Orders.findAll({
      where: { comprador_id: userId },
      include: [
        {
          model: OrderDetails,
          as: 'detalles',
          attributes: ['producto_id', 'cantidad', 'precio_unitario'],
        },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};
