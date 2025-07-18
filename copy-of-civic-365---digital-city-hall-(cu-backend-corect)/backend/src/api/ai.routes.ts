
import { Router } from 'express';
import * as aiController from '../controllers/ai.controller';

const router = Router();

router.post('/assist', aiController.getAssistance);
router.get('/report-status/:reportId', aiController.getReportStatus);

export default router;
