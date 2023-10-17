import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Crypto from 'crypto-js';
import * as nodemailer from 'nodemailer';
import UserEntity from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .where('email = :email', { email })
        .getOne();

      if (!user) {
        throw new NotFoundException(`User with email ${email} was not found`);
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async send(email: string): Promise<void> {
    try {
      await this.findByEmail(email);

      const cipherEmail = Crypto.AES.encrypt(
        email,
        process.env.DECRYPT_KEY,
      ).toString();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Real estate password reset link',
        text: 'Please follow the link to change your password. If you have not initiated a password change, ignore this message.',
        html: `<h1>Please follow the <a href=${process.env.FRONTEND_BASE_URL}/api/auth/changepassword?email=${cipherEmail}">LINK</a> to change your password. If you have not initiated a password change, ignore this message.</h1>`,
      };

      await transporter.sendMail(mailOptions);

      throw new HttpException('Done', HttpStatus.OK);
    } catch (error) {
      throw error;
    }
  }
}
