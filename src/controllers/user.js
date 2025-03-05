import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { updateUser } from '../services/user.js';

export const patchUserController = async (req, res, next) => {
  const userId = req.params.userId;

  let avatarUrl;

  if (req.file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return next(
        createHttpError(400, 'Invalid file type. Allowed: jpeg, png, jpg'),
      );
    }

    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(req.file);
    } else {
      avatarUrl = await saveFileToUploadDir(req.file);
    }
  }

  const updatedUser = await updateUser(userId, {
    ...req.body,
    ...(avatarUrl ? { avatar: avatarUrl } : {}),
  });

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  res.json({
    status: 200,
    message: 'User successfully updated!',
    data: updatedUser,
  });
};

export const patchAvatarController = async (req, res, next) => {
  const userId = req.params.userId;

  if (!req.file) {
    return next(createHttpError(400, 'Avatar file is required'));
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return next(
      createHttpError(400, 'Invalid file type. Allowed: jpeg, png, jpg'),
    );
  }

  let avatarUrl;
  if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
    avatarUrl = await saveFileToCloudinary(req.file);
  } else {
    avatarUrl = await saveFileToUploadDir(req.file);
  }

  const updatedUser = await updateUser(userId, { avatar: avatarUrl });

  if (!updatedUser) {
    return next(createHttpError(404, 'User not found'));
  }

  res.json({
    status: 200,
    message: 'Avatar successfully updated!',
    data: updatedUser,
  });
};
