import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/models/user.model';
import {UserService} from './user.service'

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async store(@Body() body: User): Promise<User> {
        try {
            return await this.userService.createUser(body)
        } catch (error) {
            
        }

    }

    @Get()
    async index() {
        return 'OK'
    }
}
