import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPassword';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmail';

export default class PasswordController {
  public async createToken(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmailService.execute({
      email
    });

    return response.status(204).json();
  }

  public async resetPassword(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
