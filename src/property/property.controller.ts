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
} from '@nestjs/common';

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
  create(@Body() body: any) {
    return { ...body };
  }
}
