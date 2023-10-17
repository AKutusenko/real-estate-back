import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { RecoveryDto } from './dto/recoveryDto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendRecoveryEmail(@Body() body: RecoveryDto): Promise<void> {
    try {
      await this.mailService.send(body.email);
    } catch (error) {
      throw error;
    }
  }
}
