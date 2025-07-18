
import { Response } from 'express';
import * as reportService from '../services/report.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { FullReport, UserRole } from '../types';

export const getAllReports = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const reports = await reportService.findAll(req.user!);
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
};

export const createReport = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { description, base64Image } = req.body;
        if (!description || !base64Image) {
            return res.status(400).json({ message: 'Image and description are required.' });
        }
        const newReport = await reportService.create(req.body, req.user!.id);
        res.status(201).json(newReport);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Error creating report' });
    }
};

const checkEmployeeRole = (userRole: UserRole, res: Response): boolean => {
    if (userRole !== 'employee') {
        res.status(403).json({ message: 'Forbidden: Insufficient privileges.' });
        return false;
    }
    return true;
}

export const updateReportStatus = async (req: AuthenticatedRequest, res: Response) => {
    if (!checkEmployeeRole(req.user!.role, res)) return;
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedReport = await reportService.updateStatus(id, status);
        if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating report status' });
    }
};

export const updateReportDetails = async (req: AuthenticatedRequest, res: Response) => {
     if (!checkEmployeeRole(req.user!.role, res)) return;
    try {
        const { id } = req.params;
        const { internalNotes, assignedTo } = req.body;
        const updatedReport = await reportService.updateDetails(id, { internalNotes, assignedTo });
         if (!updatedReport) return res.status(404).json({ message: 'Report not found' });
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating report details' });
    }
};

export const submitReportFeedback = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;
        const updatedReport = await reportService.submitFeedback(id, req.user!.id, rating, comment);
        if (!updatedReport) return res.status(404).json({ message: 'Report not found or not owned by user' });
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback' });
    }
};