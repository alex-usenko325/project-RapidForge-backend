import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (userId, payload) => {
  const updatedUser = await UsersCollection.findOneAndUpdate(
    { _id: userId },
    { $set: payload },
    { new: true, runValidators: true },
  );
  return updatedUser;
};
