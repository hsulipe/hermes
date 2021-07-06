export default class NotFoundError {
  public readonly message: string;

  public readonly statusCode: number = 404;

  constructor(message: string = 'Not Found') {
    this.message = message;
  }
}
