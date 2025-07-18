

import { Router } from 'express';
import authRoutes from './auth.routes';
import reportRoutes from './reports.routes';
import appointmentRoutes from './appointments.routes';
import announcementRoutes from './announcements.routes';
import aiRoutes from './ai.routes';
import marketplaceRoutes from './marketplace.routes';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use('/auth', authRoutes);

// All routes below this are protected
router.use('/reports', authMiddleware, reportRoutes);
router.use('/appointments', authMiddleware, appointmentRoutes);
router.use('/announcements', authMiddleware, announcementRoutes);
router.use('/ai', authMiddleware, aiRoutes);
router.use('/marketplace', authMiddleware, marketplaceRoutes);


export default router;