import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserValidationSchema } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  patchAvatarController,
  patchUserController,
} from '../controllers/user.js';
import { upload } from '../middlewares/multer.js';

const userRouter = Router();

userRouter.patch(
  '/update/:userId',
  upload.single('avatar'),
  validateBody(updateUserValidationSchema),
  ctrlWrapper(patchUserController),
);

userRouter.patch(
  '/avatar/:userId',
  upload.single('avatar'),
  ctrlWrapper(patchAvatarController),
);

export default userRouter;
