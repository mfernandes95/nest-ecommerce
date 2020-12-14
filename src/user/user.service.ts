import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { DeleteResult } from "./result/DeleteResult";
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private mailerService: MailerService,
  ) {
  }

  find(): Promise<User[]> {
    const user = this.userRepo.find()

    return user
  }

  findById(id: String): Promise<User> {
    return this.userRepo.findOneOrFail({ id })
  }

  // Login
  async findByEmail(email: String): Promise<User> {
    return await this.userRepo.findOneOrFail({ where: { email } })
  }

  async createUser(body: UserDto | User): Promise<User> {
    const user = this.userRepo.create({
      ...body,
      confirmationToken: crypto.randomBytes(32).toString('hex')
    })

    const mail = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Email de confirmação',
      template: 'email-confirmation',
      context: {
        token: user.confirmationToken,
      },
    };

    console.log('mailll', mail);
    await this.mailerService.sendMail(mail);

    return await this.userRepo.save(user).catch(err => {
      if (err.code == '23505') {
        throw new HttpException({
          status: 400,
          error: 'User Already Exists',
          path: '/users',
          timestamp: new Date().toISOString(),
        }, 400);
      }

      throw new HttpException({
        status: 400,
        error: 'Failed to create user!',
        path: '/users',
        timestamp: new Date().toISOString(),
      }, 400);
    })
  }

  // async update(id: String, userUpdateDto: UpdateUserDto): Promise<User> {
  //   const user = await this.userRepo.findOneOrFail({ id })
  //   console.log('userrr', userUpdateDto);
  //   await this.userRepo.update({ id }, userUpdateDto)
  //   // user.name = userUpdateDto.name
  //   await this.userRepo.save(user)
  //   return this.userRepo.findOneOrFail({ id })
  //   // return user
  // }

  async update(id: String, userUpdateDto): Promise<User> {
    const user = await this.userRepo.findOneOrFail({ id })
    console.log('dwhadwahdaidawdd==================', userUpdateDto);
    user.name = userUpdateDto.name;
    user.password = userUpdateDto.password
    // await this.userRepo.update({ id }, userUpdateDto)
    await this.userRepo.save(user)
    // return this.userRepo.findOneOrFail({ id })
    return user
  }

  async remove(id: String): Promise<DeleteResult> {
    await this.userRepo.findOneOrFail({ id })

    // for use this throw not use findOne insted findOneOrFail
    // if (!user) throw new HttpException('NOT_FOUNDzzzzz', HttpStatus.NOT_FOUND);
    return await this.userRepo.delete({ id })
  }
}
