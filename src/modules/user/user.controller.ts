import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserSignUpDto from './dto/user.signup.dto';
import UserSignInDto from './dto/user.signin.dto';

@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body() data: UserSignUpDto): Promise<object> {
    return this.userService.signUp(data);
  }

  @Post('/signin')
  signIn(@Body() data: UserSignInDto): Promise<object> {
    return this.userService.signIn(data);
  }
}
