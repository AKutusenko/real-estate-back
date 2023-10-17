import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CardService } from './card.service';
import CreateCardDto from './dto/createCard.dto';

@Controller('/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateCardDto): Promise<object> {
    try {
      return await this.cardService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<object> {
    try {
      return await this.cardService.findAll();
    } catch (error) {
      throw error;
    }
  }
}
