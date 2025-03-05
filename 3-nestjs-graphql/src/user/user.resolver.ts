import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user-input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findOne(id);
  }

  @ResolveField('profile')
  async profile(@Parent() user: User) {
    return await user.profile;
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }
}
