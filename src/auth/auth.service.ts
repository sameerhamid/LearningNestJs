import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPassordMatched = await compare(password, user.password);
    if (!isPassordMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    return {
      id: user.id,
    };
  }
}
