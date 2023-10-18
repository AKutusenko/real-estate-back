import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';
import CreateUserDto from './dto/userDto';
import { JwtService } from '@nestjs/jwt';
import * as Crypto from 'crypto-js';
import * as argon2 from 'argon2';
import { ResetPasswordDto } from './dto/resetPassword.dto';

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

  async findByEmail(data: ResetPasswordDto): Promise<UserEntity> {
    try {
      const originalEmail = Crypto.DES.decrypt(
        data.email,
        process.env.DECRYPT_KEY,
      ).toString(Crypto.enc.Utf8);

      const user = await this.userRepository
        .createQueryBuilder()
        .where('email = :originalEmail', { originalEmail })
        .getOne();

      if (!user) {
        throw new NotFoundException(`User was not found`);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async changePassword(
    id: number,
    UserDTO: CreateUserDto,
  ): Promise<UserEntity> {
    try {
      const hash = await argon2.hash(UserDTO.password);

      await this.userRepository
        .createQueryBuilder()
        .update()
        .set({ password: hash })
        .where('id = :id', { id })
        .execute();

      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
}
