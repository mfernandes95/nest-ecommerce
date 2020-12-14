import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from './match.decorator';
import { UserDto } from './user.dto';

export class UpdateUserDto {

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  // @IsNotEmpty()
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak', })
  password: string;

  // @ApiProperty()
  //   // @IsNotEmpty()
  // @Match('password', { message: 'Password does not' })
  // confirmed_password: string;
}