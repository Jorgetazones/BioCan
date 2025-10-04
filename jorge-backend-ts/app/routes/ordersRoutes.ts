import { Router } from 'express';
import {
  createOrder,
  getOrdersByUser,
  updateOrder,
} from '../controllers/ordersController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/user/:userId', getOrdersByUser, verifyToken);
router.post('/', createOrder, verifyToken);
router.put('/:id', updateOrder, verifyToken);

export default router;
