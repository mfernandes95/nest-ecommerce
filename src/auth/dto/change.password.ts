import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, Matches } from "class-validator";
import { Match } from "./match.decorator";

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak', })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Match('password', { message: 'Password does not' })
  confirmed_password: string;
}