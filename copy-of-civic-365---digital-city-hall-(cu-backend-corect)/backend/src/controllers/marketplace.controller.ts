
import { Request, Response } from 'express';
import * as marketplaceService from '../services/marketplace.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getAllBusinesses = async (req: Request, res: Response) => {
    try {
        const businesses = await marketplaceService.findAll();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching local businesses.' });
    }
};

export const createBusiness = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // Validation could be more robust here (e.g., using a library like Zod)
        const { name, category, description, phone } = req.body;
        if (!name || !category || !description || !phone) {
            return res.status(400).json({ message: 'Name, category, description, and phone are required.' });
        }
        
        const newBusiness = await marketplaceService.create(req.body, req.user!);
        res.status(201).json(newBusiness);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Error creating business listing.' });
    }
};