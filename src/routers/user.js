import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserByIdController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = Router();
userRouter.get(
  '/currentUser',
  authenticate,
  ctrlWrapper(getUserByIdController),
);

export default userRouter;
