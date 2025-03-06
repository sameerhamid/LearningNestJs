import { Injectable } from '@nestjs/common';
import { Parent, ResolveField } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.UserRepo.find();
  }

  async findOne(id: number) {
    const user = await this.UserRepo.findOne({ where: { id } });
    if (!user) {
      throw new EntityNotFoundError(User, id);
    }
    return user;
  }

  async create(user: CreateUserInput) {
    const newUser = this.UserRepo.create(user);
    return await this.UserRepo.save(newUser);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.UserRepo.findOneByOrFail({ id });
    return await this.UserRepo.save(
      new User(Object.assign(user, updateUserInput)),
    );
  }

  async remove(id: number) {
    const user = await this.UserRepo.findOneByOrFail({ id });
    const result = await this.UserRepo.delete(id);
    return result.affected === 1;
  }
}
