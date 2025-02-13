import { IsInt, IsString, Length } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(3, 10, { message: 'error on length' })
  name: string;

  @Length(3, 10, { groups: ['create'] })
  @Length(1, 10, { groups: ['update'] })
  @IsString()
  description: string;

  @IsInt()
  area: number;
}
