import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  // @IsOptional({ groups: ['update'] })
  @IsString()
  @Length(3, 50)
  name: string;

  // @IsOptional({ groups: ['update'] })
  @Length(3, 20)
  // @Length(1, 50, { groups: ['update'] })
  @IsString()
  description: string;

  // @IsOptional({ groups: ['update'] })
  @IsInt()
  price: number;
}
