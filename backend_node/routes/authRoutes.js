// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, protectedRoute } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js'; // Middleware for token verification

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/protected', authenticateToken, protectedRoute); // Protected route

export default router;
