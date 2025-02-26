import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth.jwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    console.log('user>>>', user);
    if (user !== null && user !== undefined) {
      throw new ConflictException('User alraedy exists');
    }

    return await this.userService.create(createUserDto);
  }

  async loginUser(user: CreateUserDto) {}

  async validateUserLocal(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    console.log('user>>>', user);
    console.log({ email, password });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordMatched = await verify(user.password, password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      id: user.id,
      name: user.name,
    };
  }

  async login(userId: number, name: string) {
    const { accessToken } = await this.generateTokens(userId);
    return {
      id: userId,
      name,
      accessToken,
    };
  }

  async generateTokens(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(payload),
    ]);

    return {
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const currentUser = {
      id: user.id,
    };
    return currentUser;
  }
}
