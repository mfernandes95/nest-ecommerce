import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UserService } from './user.service'

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async index(): Promise<User[]> {
        return await this.userService.find()
    }

    @Get(':id')
    async show(@Param('id') id: String): Promise<User> {
        return await this.userService.findById(id)
    }

    @Post()
    async store(@Body() body: User): Promise<User> {
        return await this.userService.createUser(body)
    }

    @Put(':id')
    async update(@Param('id') id: String, @Body() body: User): Promise<User>{
        return await this.userService.update(id, body)
    }

    @Delete(':id')
    // @HttpCode(204)
    async destroy(@Param('id') id: String): Promise<void>{
        await this.userService.remove(id)
    }
}
