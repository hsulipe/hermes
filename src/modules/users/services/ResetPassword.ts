import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import TokenRepository from '../typeorm/repositories/TokenRepository';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string,
  password: string,
}

class ResetPasswordService {
  public async execute({
    token,
    password,
  }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const tokenRepository = getCustomRepository(TokenRepository);

    const userToken = await tokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User not found.', 404);
    }

    const user = await userRepository.findById(userToken.id);

    if(!user) {
      throw new AppError('User not found.', 404);
    }

    if(isAfter(Date.now(), addHours(userToken.created_at, 2))) {
      throw new AppError('Token is expired.', 403);
    }

    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}

export default ResetPasswordService;
