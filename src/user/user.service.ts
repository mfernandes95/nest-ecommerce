import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {
    }

    createUser(userDto: User): Promise<User> {
        const user = this.userRepo.create(userDto);
        return this.userRepo.save(user)
    }
}
