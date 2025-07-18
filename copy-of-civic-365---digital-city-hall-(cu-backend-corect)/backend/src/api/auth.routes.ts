
import { Router } from 'express';
import { loginUser, getMe, registerUser } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', authMiddleware, getMe);

export default router;