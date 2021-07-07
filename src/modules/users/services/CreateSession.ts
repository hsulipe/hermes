import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface ICreateSessionRequest {
  email: string;
  password: string;
}

interface ICreateSessionResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: ICreateSessionRequest): Promise<ICreateSessionResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({
      id: user.id,
      name: user.name,
      email: user.email,
    }, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    };
  }
}
