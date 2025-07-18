
import { Response } from 'express';
import * as appointmentService from '../services/appointment.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const getAllAppointments = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const appointments = await appointmentService.findAll(req.user!);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
};

export const createAppointment = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const newAppointment = await appointmentService.create(req.body, req.user!);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment' });
    }
};

export const updateAppointmentStatus = async (req: AuthenticatedRequest, res: Response) => {
    if (req.user!.role !== 'employee') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedAppointment = await appointmentService.updateStatus(id, status);
        if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status' });
    }
};