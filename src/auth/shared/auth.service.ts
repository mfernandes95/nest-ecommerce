import { UserService } from '../../user/user.service'
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly userRepo: Repository<User>,
    private mailerService: MailerService,
  ) { }

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(userEmail);

    if (user.confirmationToken) throw new HttpException({
      status: 403,
      error: 'Email not confirmed!',
      path: '/products',
      timestamp: new Date().toISOString(),
    }, 403);

    if (await bcrypt.compare(userPassword, user.password)) {
      const { id, name, email } = user;
      return { id, name, email };
    }

    return null
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    this.userRepo.findOneOrFail({ confirmationToken })
    await this.userRepo.update({ confirmationToken }, { confirmationToken: null })
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userRepo.findOneOrFail({ email });

    user.recoverToken = crypto.randomBytes(32).toString('hex');
    await user.save();

    const mail = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: user.recoverToken,
      },
    };
    await this.mailerService.sendMail(mail);
  }
}
