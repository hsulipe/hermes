import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import TokenRepository from '../typeorm/repositories/TokenRepository';
import EtherealMail from '../../../config/mail/EtherealMail';
import path from 'path';

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'config',
      'mail',
      'Templates',
      'forgot_password.hbs'
    )


    await EtherealMail.sendEmail({
      from: {
        name: 'no-reply',
        address: 'no-reply@hermes.com',
      },
      to: {
        name: user.name,
        address: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        template: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      }
    })
  }
}

export default SendForgotPasswordEmailService;
