import { EntityRepository, Repository } from "typeorm";
import Token from "../entities/Token";

@EntityRepository(Token)
export default class UserRepository extends Repository<Token> {
  public async findByToken(token: string): Promise<Token | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      }
    })

    return userToken;
  }

  public async generate(user_id: string): Promise<Token | undefined> {
    const userToken = await this.create({
      user_id,
    });

    await this.save(userToken);

    return userToken;
  }
}
