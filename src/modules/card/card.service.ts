import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCardDto from './dto/create-card.dto';
import CardEntity from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(data: CreateCardDto): Promise<object> {
    try {
      const card = this.cardRepository.create(data);
      await this.cardRepository.save(card);
      throw new HttpException('Created', HttpStatus.CREATED);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<object> {
    try {
      return await this.cardRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
