import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { UserResponse } from './api-doc/user.response';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/shared/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiResponse({
        type: UserResponse
    })
    @UseGuards(JwtAuthGuard)
    @Get()
    async index(
    ): Promise<User[]> {
        return await this.userService.find()
    }

    @ApiResponse({
        type: UserResponse
    })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async show(
        @Param('id') id: string,
    ): Promise<User> {
        return await this.userService.findById(id)
    }

    @ApiCreatedResponse({
        type: UserResponse
    })
    @HttpCode(201)
    @Post()
    async store(
        @Body(new ValidationPipe)
        body: CreateUserDto
    ): Promise<User> {
        return await this.userService.createUser(body)
    }

    @ApiResponse({
        type: UserResponse
    })
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe({ skipMissingProperties: true })) updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return await this.userService.update(id, updateUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(204)
    async destroy(
        @Param('id') id: string,
    ): Promise<string> {
        await this.userService.remove(id)
        return 'User Removed!'
    }
}
