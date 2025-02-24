import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly pirsma: PrismaService) {}

  async findByEmail(email: string) {
    this.pirsma.users.findUnique({ where: { email } });
  }
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
}
