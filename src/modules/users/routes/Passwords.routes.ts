import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const passwordController = new PasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    }
  }),
  passwordController.createToken);

passwordRouter.post(
    '/reset',
    celebrate({
      [Segments.BODY]: {
        token: Joi.string().required(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string()
        .required()
        .valid(Joi.ref('password'))
      }
    }),
    passwordController.resetPassword);

export default passwordRouter;
