import { Request, Response } from 'express';
import { Transaction } from 'sequelize';
import sequelize from '../config/db';
import Multimedia from '../model/Multimedia';
import Product from '../model/Product';
import { IProductUpdated } from '../types/product';
import logger from '../utils/logger';

// Obtener todos los productos
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.findAll({
      include: [{ model: Multimedia }],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

// Obtener un producto por ID
export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Multimedia }],
    });
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// Crear un nuevo producto
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    usuario_id,
    nombre,
    descripcion,
    precio,
    unidad_medida,
    stock,
    categoria,
    ubicacion,
    estado,
  } = req.body;

  const precioFormateado = parseFloat(precio.replace(',', '.'));
  const imagen = req.file?.filename;

  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  const regexNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{1,100}$/;
  const regexDescripcion = /^.{0,500}$/;
  const regexPrecio = /^\d+(\.\d{1,2})?$/;
  const regexStock = /^\d+$/;

  if (
    !usuario_id ||
    !nombre ||
    !precio ||
    !stock ||
    !unidad_medida ||
    !categoria ||
    !estado
  ) {
    res.status(400).json({ message: 'Faltan campos obligatorios.' });
    return;
  }

  if (!regexNombre.test(nombre)) {
    res.status(400).json({ message: 'Nombre inválido.' });
    return;
  }

  if (descripcion && !regexDescripcion.test(descripcion)) {
    res.status(400).json({ message: 'Descripción demasiado larga.' });
    return;
  }

  if (!regexPrecio.test(precioFormateado.toString()) || precioFormateado <= 0) {
    res.status(400).json({ message: 'Precio inválido.' });
    return;
  }

  if (!regexStock.test(stock.toString()) || Number(stock) < 0) {
    res.status(400).json({ message: 'Stock inválido.' });
    return;
  }

  const unidadMedidaValida = ['kg', 'unidad'].includes(
    unidad_medida.toLowerCase()
  );
  const categoriaValida = ['frutas', 'verduras', 'granos', 'otros'].includes(
    categoria.toLowerCase()
  );
  const estadoValido = ['disponible', 'poco stock', 'agotado'].includes(
    estado.toLowerCase()
  );

  if (!unidadMedidaValida) {
    res.status(400).json({ message: 'Unidad de medida inválida.' });
    return;
  }

  if (!categoriaValida) {
    res.status(400).json({ message: 'Categoría inválida.' });
    return;
  }

  if (!estadoValido) {
    res.status(400).json({ message: 'Estado inválido.' });
    return;
  }

  const transaction: Transaction = await sequelize.transaction();

  try {
    const newProduct = await Product.create(
      {
        usuario_id,
        nombre,
        descripcion,
        precio: precioFormateado,
        unidad_medida: unidad_medida.toLowerCase() as 'kg' | 'unidad',
        stock: parseInt(stock),
        categoria: categoria.toLowerCase() as
          | 'frutas'
          | 'verduras'
          | 'granos'
          | 'otros',
        ubicacion,
        estado: estado.toLowerCase() as 'disponible' | 'poco stock' | 'agotado',
      },
      { transaction }
    );

    if (imagen) {
      await Multimedia.create(
        {
          producto_id: newProduct.id,
          url: imagen,
          tipo: 'imagen',
        },
        { transaction }
      );
    }

    await transaction.commit();
    res.status(201).json(newProduct);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

// Actualizar un producto
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    usuario_id,
    nombre,
    descripcion,
    precio,
    unidad_medida,
    stock,
    categoria,
    ubicacion,
    estado,
  } = req.body;

  const regexNombre = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]{1,100}$/;
  const regexDescripcion = /^.{0,500}$/;
  const regexPrecio = /^\d+(\.\d{1,2})?$/;
  const regexStock = /^\d+$/;

  const transaction: Transaction = await sequelize.transaction();

  try {
    const product = await Product.findByPk(id, { transaction });
    if (!product) {
      await transaction.rollback();
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    if (nombre !== undefined && !regexNombre.test(nombre)) {
      await transaction.rollback();
      res.status(400).json({ message: 'Nombre inválido.' });
      return;
    }

    if (descripcion !== undefined && !regexDescripcion.test(descripcion)) {
      await transaction.rollback();
      res.status(400).json({ message: 'Descripción demasiado larga.' });
      return;
    }

    if (precio !== undefined) {
      if (!regexPrecio.test(precio.toString()) || Number(precio) <= 0) {
        await transaction.rollback();
        res.status(400).json({ message: 'Precio inválido.' });
        return;
      }
    }

    if (stock !== undefined) {
      if (!regexStock.test(stock.toString()) || Number(stock) < 0) {
        await transaction.rollback();
        res.status(400).json({ message: 'Stock inválido.' });
        return;
      }
    }

    if (
      unidad_medida !== undefined &&
      !['kg', 'unidad'].includes(unidad_medida.toLowerCase())
    ) {
      await transaction.rollback();
      res.status(400).json({ message: 'Unidad de medida inválida.' });
      return;
    }

    if (
      categoria !== undefined &&
      !['frutas', 'verduras', 'granos', 'otros'].includes(
        categoria.toLowerCase()
      )
    ) {
      await transaction.rollback();
      res.status(400).json({ message: 'Categoría inválida.' });
      return;
    }

    if (
      estado !== undefined &&
      !['disponible', 'poco stock', 'agotado'].includes(estado.toLowerCase())
    ) {
      await transaction.rollback();
      res.status(400).json({ message: 'Estado inválido.' });
      return;
    }

    let newEstado = estado?.toLowerCase() ?? product.estado;

    if (stock === 0) {
      newEstado = 'agotado';
    } else if (
      (unidad_medida === 'kg' && stock < 5) ||
      (unidad_medida === 'unidad' && stock < 20)
    ) {
      newEstado = 'poco stock';
    } else {
      newEstado = 'disponible';
    }

    const updatedFields: IProductUpdated = {
      usuario_id: usuario_id ?? product.usuario_id,
      nombre: nombre ?? product.nombre,
      descripcion: descripcion ?? product.descripcion,
      precio: precio !== undefined ? parseFloat(precio) : product.precio,
      unidad_medida: unidad_medida?.toLowerCase() ?? product.unidad_medida,
      stock: stock !== undefined ? parseInt(stock) : product.stock,
      categoria: categoria?.toLowerCase() ?? product.categoria,
      ubicacion: ubicacion ?? product.ubicacion,
      estado: newEstado,
    };

    await product.update(updatedFields, { transaction });
    await transaction.commit();

    res.status(200).json(product);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

// Eliminar un producto
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const transaction: Transaction = await sequelize.transaction();

  try {
    const product = await Product.findByPk(id, { transaction });
    if (!product) {
      await transaction.rollback();
      res.status(404).json({ message: 'Producto no encontrado' });
      return;
    }

    await product.destroy({ transaction });
    await transaction.commit();

    logger.info('Producto eliminado correctamente');
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

// Obtener productos por ID de usuario
export const getProductsByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const products = await Product.findAll({ where: { usuario_id: userId } });
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener los productos del usuario', error });
  }
};
