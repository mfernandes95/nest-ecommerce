import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(
    private mailerService: MailerService,
    connection: Connection
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    event.entity.confirmationToken = crypto.randomBytes(32).toString('hex')
    event.entity.password = await bcrypt.hash(event.entity.password, 10);

  }

  async beforeUpdate(event: InsertEvent<User>) {
    if (event.entity.password)
      event.entity.password = await bcrypt.hash(event.entity.password, 10);
  }

  async afterUpdate(event: InsertEvent<User>) {
    if (event.entity.recoverToken) {
      console.log('baaaa');
      const mail = {
        to: event.entity.email,
        from: 'noreply@application.com',
        subject: 'Recuperação de senha',
        template: 'recover-password',
        context: {
          token: event.entity.recoverToken,
        },
      };

      await this.mailerService.sendMail(mail);
    }
  }

  async afterInsert(event: InsertEvent<User>) {
    const mail = {
      to: event.entity.email,
      from: 'noreply@application.com',
      subject: 'Email de confirmação',
      template: 'email-confirmation',
      context: {
        token: event.entity.confirmationToken,
      },
    };

    await this.mailerService.sendMail(mail);
  }
}