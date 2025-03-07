import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createWaterRecordSchema } from '../validation/createWaterRecordSchema.js';
import {
  addWaterRecordController,
  getWaterTodayController,
  updateWaterRecordController,
  deleteWaterRecordController,
} from '../controllers/water.js';
import { updateWaterRecordSchema } from '../validation/updateWaterRecordSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const waterRouter = Router();

waterRouter.post(
  '/',
  authenticate,
  validateBody(createWaterRecordSchema),
  ctrlWrapper(addWaterRecordController),
);

waterRouter.get('/today', authenticate, ctrlWrapper(getWaterTodayController));

waterRouter.patch(
  '/:id',
  authenticate,
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(updateWaterRecordController),
);

waterRouter.delete(
  '/:id',
  authenticate,
  ctrlWrapper(deleteWaterRecordController),
);

export default waterRouter;
