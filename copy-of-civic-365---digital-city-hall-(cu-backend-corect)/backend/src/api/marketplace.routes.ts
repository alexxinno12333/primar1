
import { Router } from 'express';
import * as marketplaceController from '../controllers/marketplace.controller';

const router = Router();

router.get('/', marketplaceController.getAllBusinesses);
router.post('/', marketplaceController.createBusiness);

export default router;
