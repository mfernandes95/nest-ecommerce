import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { Unique } from "typeorm";
import { Match } from "./match.decorator";

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
    // @Unique()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @Match('password')
    confirmed_password: string;
}
