import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import UserSignUpDto from './dto/user.signup.dto';
import UserSignInDto from './dto/user.signin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(data: UserSignUpDto): Promise<object> {
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
  async signIn(data: UserSignInDto): Promise<object> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: data.email },
      });
      if (!user || !(await user.comparePassword(data.password))) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { firstName, lastName } = user;
      return { firstName, lastName };
    } catch (error) {
      throw error;
    }
  }
}
