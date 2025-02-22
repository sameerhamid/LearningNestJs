import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  bedrooms: number;

  @Column({
    type: 'int',
  })
  bathrooms: number;

  @Column({
    type: 'int',
  })
  parkingSpots: number;

  @Column({
    type: 'int',
  })
  area: number;

  @Column({
    type: 'boolean',
  })
  hasSwimmingPool: boolean;

  @Column({
    type: 'boolean',
  })
  hasGarderYard: boolean;

  @Column({
    type: 'boolean',
  })
  hasBalcony: boolean;

  @OneToOne(() => Property, (property) => property.propertyFeature)
  @JoinColumn()
  property: number;
}
