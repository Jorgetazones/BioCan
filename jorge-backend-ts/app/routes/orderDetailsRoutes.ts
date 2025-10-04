import express from 'express';
import {
  deleteOrderDetail,
  getOrderDetail,
  getOrderDetails,
  postOrderDetail,
  updateOrderDetail,
} from '../controllers/orderDetailsController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Get all order details
router.get('/', getOrderDetails, verifyToken);

// Get order details by ID
router.get('/:id', getOrderDetail), verifyToken;

// Create new order details
router.post('/', postOrderDetail, verifyToken);

// Update order details by ID
router.put('/:id', updateOrderDetail, verifyToken);

// Delete order details by ID
router.delete('/:id', deleteOrderDetail, verifyToken);

export default router;
