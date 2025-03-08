import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtGuard } from 'src/auth/guards/gql-jwt-guard/gql-jwt.guard';
import { JwtUser } from 'src/auth/types/jwt-user';

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

  // @ResolveField('profile')
  // async profile(@Parent() user: User) {
  //   return await user.profile;
  // }

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput);
  // }

  @UseGuards(GqlJwtGuard)
  @Mutation(() => User)
  updateUser(
    @Context() context: { req: { user: JwtUser } },

    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const id = context.req.user.userId;

    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
