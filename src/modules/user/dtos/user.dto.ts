import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsEmail()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
