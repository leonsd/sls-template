import nodemailer from 'nodemailer';

export class EmailService {
  private static sourceEmail = process.env.SOURCE_EMAIL;

  constructor(private readonly clientEmail: nodemailer.Transporter) {}

  static getInstance() {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    return new EmailService(transporter);
  }

  send = async (to: string, subject: string, body: string) => {
    const email = {
      from: EmailService.sourceEmail,
      to,
      subject,
      text: body,
    };

    return await this.clientEmail.sendMail(email);
  };
}
