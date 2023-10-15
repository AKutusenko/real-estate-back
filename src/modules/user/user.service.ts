import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import UserSignUpDto from './dto/signup-user.dto';
import UserSignInDto from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) { }

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

  async signIn(data: UserSignInDto): Promise<string> {
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

      return await this.jwtService.signAsync({ id: user.id });
    } catch (error) {
      throw error;
    }
  }
}
