import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cards')
export default class CardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  generalPrice: string;

  @Column()
  oneTicketPrice: string;

  @Column()
  yield: string;

  @Column()
  timeLeft: string;

  @Column()
  sold: string;
}
