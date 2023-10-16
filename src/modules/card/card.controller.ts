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
  create(@Body() data: CreateCardDto): Promise<object> {
    return this.cardService.create(data);
  }

  @Get()
  findAll(): Promise<object> {
    return this.cardService.findAll();
  }
}
