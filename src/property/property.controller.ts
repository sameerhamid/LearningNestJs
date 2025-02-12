import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'This action returns all property';
  }

  @Get(':id/:slug')
  findOne(@Param('id') id: string, @Param('slug') slug: string) {
    return {
      id,
      slug,
    };
  }

  @Post()
  @HttpCode(201)
  create(@Body() body: any) {
    return { ...body };
  }
}
