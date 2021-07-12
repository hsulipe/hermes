import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/IsAuthenticated';
import AvatarController from '../controllers/AvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }
  }),
  usersController.create);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
  );
export default usersRouter;
