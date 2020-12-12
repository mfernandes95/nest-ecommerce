import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";

@Injectable()
export default class Mail {
  constructor(
    @InjectRepository(User)
    // private readonly userRepo: Repository<User>,
    private mailerService: MailerService,
  ) {
  }

  async sendMail(mail) {
    await this.mailerService.sendMail(mail);

  }
}