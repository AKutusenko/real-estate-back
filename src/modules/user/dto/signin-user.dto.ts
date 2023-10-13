import { IsEmail, IsNotEmpty } from '@nestjs/class-validator';

export default class UserSignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
