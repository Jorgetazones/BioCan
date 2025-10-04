import { Router } from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  updateUser,
} from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/:id', getUser, verifyToken);
router.put('/:id', updateUser, verifyToken);
router.delete('/:id', deleteUser, verifyToken);

router.get('/', getUsers);
router.post('/', postUser);

export default router;
