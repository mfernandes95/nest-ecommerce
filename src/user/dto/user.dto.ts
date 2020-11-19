import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEmail, Matches, Validate } from 'class-validator';
import { User } from "../entity/user.entity";
// import { Unique } from "typeorm";
import { Match } from "./match.decorator";
import { IsUserAlreadyExist } from '../dto/unique-validator';

export class UserDto {

    @ApiProperty({
        type: String,
        description: 'name of user'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    // @Validate(UniqueOnDatabase)
    @IsUserAlreadyExist({
        message: 'User $value already exists. Choose another email.',
    })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @Match('password', { message: 'Password does not' })
    confirmed_password: string;
}
