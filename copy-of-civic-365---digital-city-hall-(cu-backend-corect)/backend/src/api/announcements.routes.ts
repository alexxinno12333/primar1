
import { Router } from 'express';
import * as announcementController from '../controllers/announcement.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Get all announcements is public, no auth needed
router.get('/', announcementController.getAllAnnouncements);

// Creating and deleting requires employee role (checked in controller)
router.post('/', authMiddleware, announcementController.createAnnouncement);
router.delete('/:id', authMiddleware, announcementController.deleteAnnouncement);


export default router;
