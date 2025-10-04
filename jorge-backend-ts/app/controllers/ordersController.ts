import { Request, Response } from 'express';
import OrderDetails from '../model/OrderDetails';
import Orders from '../model/Orders';
import Products from '../model/Product';
import Users from '../model/User';

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
          as: 'orderDetails',
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

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const transaction = await Orders.sequelize?.transaction(); // Inicia una transacción
  try {
    const { userId, items, total } = req.body;

    console.log('Datos recibidos:', { userId, items, total });

    // Buscar al usuario para obtener su dirección
    const user = await Users.findByPk(userId);

    // Validar stock disponible para cada producto
    for (const item of items) {
      const product = await Products.findByPk(item.productId);
      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto ${product.nombre}. Disponible: ${product.stock}, Solicitado: ${item.quantity}`
        );
      }
    }

    // Crear el pedido con la dirección del usuario
    const newOrder = await Orders.create(
      {
        comprador_id: userId,
        total,
        estado: 'pendiente',
        direccion_envio: user?.direccion || 'Dirección no disponible',
        metodo_pago: 'transferencia',
      },
      { transaction }
    );

    console.log('Pedido creado:', newOrder);

    for (const item of items) {
      await OrderDetails.create(
        {
          pedido_id: newOrder.id,
          producto_id: item.productId,
          cantidad: item.quantity,
          precio_unitario: item.price,
        },
        { transaction }
      );

      const product = await Products.findByPk(item.productId);
      if (product) {
        product.stock -= item.quantity;
        await product.save({ transaction });
      }
    }

    await transaction?.commit();

    res
      .status(201)
      .json({ message: 'Pedido creado con éxito', order: newOrder });
  } catch (error) {
    console.error('Error al procesar el pedido:', error);

    await transaction?.rollback();

    res.status(500).json({ message: error || 'Error al procesar el pedido' });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (isNaN(Number(id))) {
      res.status(400).json({ message: 'El id debe ser un número válido' });
    }

    const pedido = await Orders.findByPk(id);

    if (!pedido) {
      res.status(404).json({ message: 'Pedido no encontrado' });
    }

    if (pedido && estado) {
      pedido.estado = estado;
    }

    if (pedido) {
      await pedido.save();
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido' });
  }
};
