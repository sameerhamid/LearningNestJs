import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
}
