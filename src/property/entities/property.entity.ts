import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { number } from 'zod';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'int',
  })
  area: number;

  @Column({
    type: 'int',
    default: 0,
  })
  price: number;
}
