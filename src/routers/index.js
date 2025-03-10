import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import waterRouter from './water.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/water', waterRouter);

export default router;
