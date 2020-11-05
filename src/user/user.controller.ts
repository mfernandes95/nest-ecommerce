import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/models/user.model';
import { UserService } from './user.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async index(): Promise<User[]> {
        return await this.userService.find()
    }

    @ApiResponse({
        type: UserResponse
    })
    @Get(':id')
    async show(@Param('id') id: String): Promise<User> {
        return await this.userService.findById(id)
    }

    @ApiCreatedResponse({
        type: UserResponse
    })
    @Post()
    async store(@Body(new ValidationPipe) body: UserDto): Promise<User> {
        return await this.userService.createUser(body)
    }

    @Put(':id')
    async update(@Param('id') id: String, @Body() body: User): Promise<User> {
        return await this.userService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(200)
    async destroy(
        @Param('id') id: String
    ): Promise<String> {
        await this.userService.remove(id)
        return 'User removed!'
    }
}
