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

    find(): Promise<User[]> {
        const user = this.userRepo.find()

        return user
    }

    findById(id: String): Promise<User> {
        return this.userRepo.findOneOrFail(+id)
    }

    createUser(userDto: User): Promise<User> {
        const user = this.userRepo.create(userDto)
        return this.userRepo.save(user)
    }

    async update(id: String, body: User): Promise<User> {
        this.userRepo.findOneOrFail(+id)
        await this.userRepo.update({id: +id}, body)
        return this.userRepo.findOneOrFail(+id)
    }

    remove(id: String): void {
        this.userRepo.findOneOrFail(+id)
        this.userRepo.delete(+id)
    }
}
