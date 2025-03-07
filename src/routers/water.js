import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterRecordSchema } from '../validation/createWaterRecordSchema.js';
import {
  addWaterRecordController,
  updateWaterRecordController,
  deleteWaterRecordController
} from '../controllers/water.js';
import { updateWaterRecordSchema } from '../validation/updateWaterRecordSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(createWaterRecordSchema),
  ctrlWrapper(addWaterRecordController),
);

router.patch(
  '/:id',
  authenticate,
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(updateWaterRecordController),
);

router.delete('/:id', authenticate, ctrlWrapper(deleteWaterRecordController));


export default router;
