import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

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
}
