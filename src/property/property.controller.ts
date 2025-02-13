import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePropertyDto } from './dot/createProperty.dto';
import { IdParamDto } from './dot/idParam.dto';
import { ParseIdPipe } from './pipes/ParseIdpipe';
import { ZodValidationPipe } from './pipes/zodValidationpipe';
import {
  CreatePropertyDtoZod,
  createPropertySchema,
} from './dot/createPropertyZod.dto';

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
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(
    @Body()
    property: CreatePropertyDtoZod,
  ) {
    return { ...property };
  }

  @Patch(':id')
  update(
    @Param('id', ParseIdPipe) id: number,
    @Body()
    property: CreatePropertyDto,
  ) {
    return {
      ...property,
      id,
    };
  }
}
