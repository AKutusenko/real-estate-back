import { IsNotEmpty } from '@nestjs/class-validator';

export default class CreateCardDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  generalPrice: string;

  @IsNotEmpty()
  oneTicketPrice: string;

  @IsNotEmpty()
  yield: string;

  @IsNotEmpty()
  timeLeft: string;

  @IsNotEmpty()
  sold: string;
}
