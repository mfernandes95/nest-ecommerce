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
    async index(
        @Res() res: Response
    ): Promise<any> {
        const users =  await this.userService.find()
        res.status(200).send({ users: users });
    }

    @ApiResponse({
        type: UserResponse
    })
    @Get(':id')
    async show(
        @Param('id') id: String,
        @Res() res: Response
    ): Promise<any> {
        const user = await this.userService.findById(id)
        return res.status(200).send({ user: user });
    }

    @ApiCreatedResponse({
        type: UserResponse
    })
    @Post()
    async store(
        @Body(new ValidationPipe)
        body: UserDto,
        @Res() res: Response
    ): Promise<any> {
        const user = await this.userService.createUser(body)
        return res.status(200).send({ user: user });

    }

    @Put(':id')
    async update(
        @Param('id') id: String,
        @Body() body: User,
        @Res() res: Response
    ): Promise<any> {
        const user = await this.userService.update(id, body)
        return res.status(200).send({ user: user });
    }

    @Delete(':id')
    // @HttpCode(200)
    async destroy(
        @Param('id') id: String,
        @Res() res: Response
    ): Promise<any> {
        await this.userService.remove(id)
        return res.status(200).send({ message: 'User removed!' });
    }
}
