import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor() {}
  async registerUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
