import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/enums/role.enum';

@ObjectType()
export class AuthPayload {
  @Field(() => Int)
  userId: string;

  @Field(() => Role)
  role: Role;

  @Field(() => String)
  accessToken: string;

  //   refreshToken: string;
}
