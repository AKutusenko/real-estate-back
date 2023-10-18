import {
  Body,
  Controller,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/userDto';

@Controller('/auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateUserDto): Promise<object> {
    try {
      return await this.userService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/resetpassword')
  async resetPassword(@Body() UserDTO: CreateUserDto): Promise<void> {
    try {
      const user = await this.userService.findByEmail(UserDTO);
      await this.userService.changePassword(user.id, UserDTO);
    } catch (error) {
      throw error;
    }
  }
}
