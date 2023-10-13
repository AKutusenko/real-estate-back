import { Controller, Get, Post, Body } from '@nestjs/common';
import { CardService } from './card.service';
import CreateCardDto from './dto/create-card.dto';

@Controller('/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() data: CreateCardDto): Promise<object> {
    return this.cardService.create(data);
  }

  @Get()
  findAll(): Promise<object> {
    return this.cardService.findAll();
  }
}
