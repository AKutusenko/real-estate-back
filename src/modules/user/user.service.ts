import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import CreateUserDto from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto): Promise<object> {
    try {
      let user = await this.userRepository.findOne({
        where: { email: data.email },
      });

      const token = this.jwtService.sign({ email: data.email });

      if (user) {
        throw new ConflictException('User with this email already exsist!');
      }
      user = this.userRepository.create(data);
      await this.userRepository.save(user);
      return {
        statusCode: 201,
        message: 'Created',
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw error;
    }
  }
}
