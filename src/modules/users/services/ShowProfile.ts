import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import NotFoundError from '../../../shared/errors/NotFoundError';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findById(user_id);

    if(!user){
      throw new NotFoundError('User not found.')
    }

    return user;
  }
}

export default ShowProfileService;
