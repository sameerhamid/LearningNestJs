import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/enums/role.enum';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String)
  username: string;

  @IsString()
  @IsEmail()
  @Field(() => String)
  email: string;

  // @IsEnum(Role)
  // @IsString()
  // @Field(() => Role)
  // role: Role;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  password: string;
}
