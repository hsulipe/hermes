import AppError from '../../../shared/errors/AppError';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import uploadConfig from '../../../config/upload';
import fs from 'fs';
import path from 'path';

interface IRequest {
  userId: string,
  avatarFilename: string,
}

class UpdateAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(userId);

    if(!user) {
      throw new AppError('User not found.', 404);
    }

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
