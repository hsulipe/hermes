import { Request, Response } from 'express';
import ListService from '../services/List';
import CreateService from '../services/Create';

export default class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUsers = new ListService();

    const users = await listUsers.execute();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUsers = new CreateService();

    const user = await createUsers.execute({
      name,
      email,
      password,
    })

    return res.json(user);
  }
}
