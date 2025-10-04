import express from 'express';

import { upload } from '../config/uploadConfig';
import {
  createMultimedia,
  deleteMultimedia,
  getMultimediaByProduct,
} from '../controllers/multimediaControllers';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', upload.single('file'), createMultimedia, verifyToken);

router.get('/:productId', getMultimediaByProduct, verifyToken);

router.delete('/:id', deleteMultimedia, verifyToken);

export default router;
