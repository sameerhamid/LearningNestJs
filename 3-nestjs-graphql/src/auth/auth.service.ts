import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { EntityNotFoundError, Repository } from 'typeorm';
import { SignInInput } from './dto/signIn.input';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/auth-payload';
import { JwtUser } from './types/jwt-user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>,
    private readonly jwtService: JwtService,
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
      throw new UnauthorizedException('Invalid Email');
    }
    const passwordMatched = await verify(user.password, input.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = {
      sub: {
        userId,
      },
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  async login(user: User): Promise<AuthPayload> {
    const { accessToken } = await this.generateToken(user.id);

    return {
      accessToken,
      userId: user.id,
      role: user.role,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.UserRepo.findOneByOrFail({ id: userId });
    const jwtUser: JwtUser = {
      userId: user.id,
      role: user.role,
    };

    return jwtUser;
  }
}
