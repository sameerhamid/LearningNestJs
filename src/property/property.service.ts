import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  constructor() {}

  findAll() {
    return 'All properties';
  }

  findOne() {}

  create() {}

  update() {}
}
