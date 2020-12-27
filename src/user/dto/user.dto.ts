import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
// import { Unique } from "typeorm";
import { Match } from "./match.decorator";

export class CreateUserDto {

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
    // @IsUserAlreadyExist({
    //     message: 'User $value already exists. Choose another email.',
    // })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak', })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @Match('password', { message: 'Password does not match' })
    confirmed_password: string;
}
