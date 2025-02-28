import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly pirsma: PrismaService) {}

  async findByEmail(email: string) {
    return this.pirsma.users.findUnique({ where: { email } });
  }
  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashedPassword = await hash(password);
    return await this.pirsma.users.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async findOne(userId: number) {
    return this.pirsma.users.findUnique({ where: { id: userId } });
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRefreshToken: string | null,
  ) {
    return await this.pirsma.users.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
