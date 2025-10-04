import express from 'express';
import { loginUser, logoutUser } from '../controllers/authController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

// Ruta para verificar autenticación
router.get('/check-auth', verifyToken, (req, res) => {
  // @ts-ignore
  res.json({ user: req.user });
});

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para cerrar sesión
router.post('/logout', logoutUser);

export default router;
