import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterRecordSchema } from '../validation/createWaterRecordSchema.js';
import { addWaterRecordController } from '../controllers/water.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(createWaterRecordSchema),
  addWaterRecordController,
);

export default router;
