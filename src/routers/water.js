import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterRecordSchema } from '../validation/createWaterRecordSchema.js';
import {
  addWaterRecordController,
  getWaterTodayController,
  updateWaterRecordController,
} from '../controllers/water.js';
import { updateWaterRecordSchema } from '../validation/updateWaterRecordSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const waterRouter = Router();
waterRouter.get('/today', authenticate, ctrlWrapper(getWaterTodayController));

waterRouter.post(
  '/',
  authenticate,
  validateBody(createWaterRecordSchema),
  addWaterRecordController,
);

waterRouter.patch(
  '/:id',
  authenticate,
  validateBody(updateWaterRecordSchema),
  updateWaterRecordController,
);

export default waterRouter;
