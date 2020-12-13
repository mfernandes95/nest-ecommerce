// import { EntityRepository, Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UserRole } from './user-roles.enum';
// import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';
// import {
//   ConflictException,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { User } from './entity/user.entity';

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {

//   async batata(id: string, password: string) {
//     const user = await this.findOne(id);
//     // user.salt = await bcrypt.genSalt();
//     // user.password = await this.hashPassword(password, user.salt);
//     // user.recoverToken = null;
//     await user.save();
//   }

// }
