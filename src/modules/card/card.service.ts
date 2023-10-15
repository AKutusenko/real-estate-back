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
      const data = await this.cardRepository.find();
      if (!data) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
