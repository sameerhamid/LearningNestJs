import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SignInInput } from './dto/signIn.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
  ) {}

  async registerUser(input: CreateUserInput) {
    const hashedPassword = await hash(input.password);
    const user = this.UserRepo.create({
      ...input,
      password: hashedPassword,
      role: Role.USER,
    });

    return this.UserRepo.save(user);
  }

  async validateUserLocal(input: SignInInput) {
    const user = await this.UserRepo.findOneBy({ email: input.email });
    if (!user) {
      throw new EntityNotFoundError(User, input.email);
    }
    const passwordMatched = await verify(user.password, input.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}
