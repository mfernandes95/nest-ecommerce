import { MailerOptions } from '@nestjs-modules/mailer';
import * as nodemailer from 'nodemailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },
  },
  // transport: `smtps://user@domain.com:pass@smtp.domain.com`,
  transport: {
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "e085e74d1d4ddc",
      pass: "ad7b299ca7c212"
    }
  }
};