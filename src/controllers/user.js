import createHttpError from 'http-errors';
import { getUserById } from '../services/user.js';

export const getUserByIdController = async (req, res) => {
  const userId = req.user._id;
  const user = await getUserById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  res.json({
    status: 200,
    data: user,
  });
};
