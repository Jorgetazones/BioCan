import express from 'express';
import {
  createRating,
  getRatingsByAgricultor,
  getRatingsByComprador,
} from '../controllers/ratingsController';

const router = express.Router();

// Route to get all ratings
router.get('/id', getRatingsByAgricultor);
router.get('/id', getRatingsByComprador);

// Route to add a new rating
router.post('/', createRating);

export default router;
