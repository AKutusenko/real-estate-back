import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/createUser.dto';

@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateUserDto): Promise<object> {
    try {
      return await this.userService.create(data);
    } catch (error) {
      throw error;
    }
  }
}
