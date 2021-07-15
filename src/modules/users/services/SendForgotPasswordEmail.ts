import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import TokenRepository from '../typeorm/repositories/TokenRepository';

interface IRequest {
  email: string,
}

class SendForgotPasswordEmailService {
  public async execute({
    email,
  }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const tokenRepository = getCustomRepository(TokenRepository);

    const user = await userRepository.findByEmail(email)

    if(!user) {
      throw new AppError('Email not found.', 404);
    }

    const token = await tokenRepository.generate(user.id);

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;