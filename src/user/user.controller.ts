import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, Res, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from 'src/api-doc/user.response';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/models/user.model';
import { UserService } from './user.service'
import { Response } from 'express';

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
        @Param('id') id: String,
        @Res() res: Response
    ): Promise<void> {
        try {
            await this.userService.remove(id)
            res.status(200).send({ message: 'User removed!' });
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }
}
