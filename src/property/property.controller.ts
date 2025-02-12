import { Controller, Get, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {
  @Get()
  findAll() {
    return 'This action returns all property';
  }

  @Post()
  create() {
    return 'This action adds a new property';
  }
}
