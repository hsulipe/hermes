import AppError from '../../../shared/errors/AppError';
import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import { getSalt, hash } from 'bcryptjs';


interface ICreateUserRequest {
  name: string,
  email: string,
  password: string,
}

class CreateService {
  public async execute({
    name,
    email,
    password
  }: ICreateUserRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (!emailExists) {
      throw new AppError('User already exists', 500);
    }

    const hashedPassword = await hash(password, 8);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateService;
