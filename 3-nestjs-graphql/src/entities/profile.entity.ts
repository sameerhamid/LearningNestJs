import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  bio: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field(() => User)
  @OneToMany(() => User, (user) => user.profile)
  user: Promise<User>;
}
