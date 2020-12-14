import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { DeleteResult } from "./result/DeleteResult";
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
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

  async createUser(body: CreateUserDto | User): Promise<User> {
    const user = this.userRepo.create(body)

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

  async update(id: String, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepo.findOneOrFail({ id })
    await this.userRepo.update({ id }, updateUserDto)
    return await this.userRepo.findOneOrFail({ id })
  }

  async remove(id: String): Promise<DeleteResult> {
    await this.userRepo.findOneOrFail({ id })

    // for use this throw not use findOne insted findOneOrFail
    // if (!user) throw new HttpException('NOT_FOUNDzzzzz', HttpStatus.NOT_FOUND);
    return await this.userRepo.delete({ id })
  }
}
