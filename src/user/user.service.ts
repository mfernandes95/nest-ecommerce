import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { DeleteResult } from "./result/DeleteResult";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
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
    findByEmail(email: String): Promise<User> {
        return this.userRepo.findOne({ where: { email } })
    }

    async createUser(body: UserDto): Promise<User> {
        const user = this.userRepo.create(body)
        return await this.userRepo.save(user)
    }

    async update(id: String, body: User): Promise<User> {
        this.userRepo.findOneOrFail({ id })
        await this.userRepo.update({ id }, body)
        return this.userRepo.findOneOrFail({ id })
    }

    async remove(id: String): Promise<DeleteResult> {
        await this.userRepo.findOneOrFail({ id })
        return await this.userRepo.delete({ id })
    }
}
