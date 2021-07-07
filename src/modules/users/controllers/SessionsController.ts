import { Request, Response } from "express";
import CreateSessionService from "../services/CreateSession";

export default class SessionsComponent {
  public async create (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = new CreateSessionService();

    const session = createSession.execute({ email, password });

    return res.json(session)
  }
}
