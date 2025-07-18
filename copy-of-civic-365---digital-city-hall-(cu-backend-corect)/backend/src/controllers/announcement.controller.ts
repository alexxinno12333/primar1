
import { Request, Response } from 'express';
import * as announcementService from '../services/announcement.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getAllAnnouncements = async (req: Request, res: Response) => {
    try {
        const announcements = await announcementService.findAll();
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching announcements' });
    }
};

export const createAnnouncement = async (req: AuthenticatedRequest, res: Response) => {
    if (req.user!.role !== 'employee') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { title, content } = req.body;
        const newAnnouncement = await announcementService.create(title, content);
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({ message: 'Error creating announcement' });
    }
};

export const deleteAnnouncement = async (req: AuthenticatedRequest, res: Response) => {
    if (req.user!.role !== 'employee') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { id } = req.params;
        const success = await announcementService.remove(id);
        if (!success) {
            return res.status(404).json({ message: 'Announcement not found' });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting announcement' });
    }
};