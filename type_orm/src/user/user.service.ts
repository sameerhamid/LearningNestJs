import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/property/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.UserRepo.update({ id: userId }, { hashedRefreshToken });
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOneBy({ email });
  }

  async findOne(id: number) {
    return await this.UserRepo.findOne({
      where: { id },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'avatarUrl',
        'hashedRefreshToken',
        'role',
      ],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.UserRepo.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.UserRepo.delete({ id });
  }
}
