
import { Router } from 'express';
import * as appointmentController from '../controllers/appointment.controller';

const router = Router();

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id/status', appointmentController.updateAppointmentStatus);

export default router;
