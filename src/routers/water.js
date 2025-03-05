import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterRecordSchema } from '../validation/createWaterRecordSchema.js';
import {
  addWaterRecordController,
  updateWaterRecordController,
} from '../controllers/water.js';
import { updateWaterRecordSchema } from '../validation/updateWaterRecordSchema.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(createWaterRecordSchema),
  addWaterRecordController,
);

router.patch(
  '/:id',
  authenticate,
  validateBody(updateWaterRecordSchema),
  updateWaterRecordController,
);

export default router;
