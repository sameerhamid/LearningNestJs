import { Injectable } from '@nestjs/common';
import { Parent, ResolveField } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.UserRepo.find();
  }

  //   @ResolveField('profile')
  //   async profile(@Parent() user: User) {
  //     return await user.profile
  //   }
}
