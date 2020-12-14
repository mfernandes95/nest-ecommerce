import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { Match } from './match.decorator';
import { CreateUserDto } from './user.dto';

export class UpdateUserDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak', })
  password: string;

  @ApiProperty()
  @IsOptional()
  @Match('password', { message: 'Password does not match' })
  confirmed_password: string;
}