import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const passwordsIsMatch = await argon2.verify(user.password, password);
      if (!user || !passwordsIsMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(user: IUser) {
    try {
      const { id, email } = user;
      return {
        id,
        email,
        token: this.jwtService.sign({ id, email }),
      };
    } catch (error) {
      throw error;
    }
  }
}
