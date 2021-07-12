import { request, Request, Response } from 'express';
import UpdateAvatarService from '../services/UpdateAvatar';

export default class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatarService();

    const user = updateAvatar.execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    return res.json(user);
  }
}
