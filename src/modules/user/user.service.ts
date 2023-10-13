import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(data: UserDto) {
    try {
      let user = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (user) {
        throw new HttpException(
          'User with this email already exsist!',
          HttpStatus.CONFLICT,
        );
      }
      user = this.userRepository.create(data);
      await this.userRepository.save(user);
      throw new HttpException('Created', HttpStatus.CREATED);
    } catch (error) {
      throw error;
    }
  }
}
