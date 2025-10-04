import { Router } from 'express';

import { upload } from '../config/uploadConfig'; // Importación nombrada
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductsByUser,
  updateProduct,
} from '../controllers/productController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Obtener todos los productos de un usuario
router.get('/user/:userId', getProductsByUser, verifyToken);

// Obtener todos los productos
router.get('/', getProducts);

// Crear producto con subida de archivo
router.post('/', upload.single('file'), createProduct, verifyToken);

// Operaciones sobre un producto específico por ID
router
  .route('/:id')
  .get(getProduct, verifyToken)
  .put(updateProduct, verifyToken)
  .delete(deleteProduct, verifyToken);

export default router;
