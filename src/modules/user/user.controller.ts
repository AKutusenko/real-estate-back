import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() data: UserDto) {
    try {
      await this.userService.signUp(data);
    } catch (error) {
      throw error;
    }
  }
}
