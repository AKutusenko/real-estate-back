import { IsEmail, IsNotEmpty, MinLength } from '@nestjs/class-validator';

export default class UserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be more than 8 symbols' })
  password: string;
}
