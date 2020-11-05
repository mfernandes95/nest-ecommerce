import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';

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

    createUser(body: any): Promise<User | any> {
        // need refactor type
        const user = this.userRepo.create(body)
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
