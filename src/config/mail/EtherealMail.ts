import nodemailer from 'nodemailer';
import TemplateParser from './TemplateParser';

interface IMailContact {
  name: string;
  address: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  from: IMailContact
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendEmail({
    from,
    to,
    subject,
    templateData,
  }: ISendMail) : Promise<void> {
    const templateParser = new TemplateParser();

    const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: from.name ?? 'no-reply',
        address: from.address ?? 'no-reply@hermes.com',
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: await templateParser.parse(templateData),
    });

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview url: ${nodemailer.getTestMessageUrl(message)}`);
  }
}
