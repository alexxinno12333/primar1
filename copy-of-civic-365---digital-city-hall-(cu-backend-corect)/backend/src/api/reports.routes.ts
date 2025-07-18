
import { Router } from 'express';
import * as reportController from '../controllers/report.controller';

const router = Router();

router.get('/', reportController.getAllReports);
router.post('/', reportController.createReport);

// Note: Using specific paths for updates is often clearer than a generic PUT/PATCH on the root
router.put('/:id/status', reportController.updateReportStatus);
router.put('/:id/details', reportController.updateReportDetails);
router.post('/:id/feedback', reportController.submitReportFeedback);

export default router;
