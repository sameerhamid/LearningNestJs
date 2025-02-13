import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dot/createProperty.dto';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'This action returns all property';
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('sort', ParseBoolPipe) sort: boolean,
  ) {
    console.log('sort', typeof sort);
    console.log('id', typeof id);
    return {
      id,
      sort,
    };
  }

  @Post()
  @HttpCode(201)
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    property: CreatePropertyDto,
  ) {
    return { ...property };
  }
}
