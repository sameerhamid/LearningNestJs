import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from './entities/property.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dot/createProperty.dto';
import { UpdatePropertyDto } from './dot/updateProperty.dto';
import { PaginationDto } from './dot/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private propertyRepo: Repository<Property>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    return await this.propertyRepo.find({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(id: number) {
    const property = await this.propertyRepo.findOneBy({ id });
    if (!property) {
      throw new NotFoundException('property not found with this id');
    }
    return property;
  }

  async create(dto: CreatePropertyDto) {
    return await this.propertyRepo.save(dto);
  }

  async update(id: number, dto: UpdatePropertyDto) {
    await this.findOne(id);

    return await this.propertyRepo.update({ id }, dto);
  }

  delete(id: number) {
    return this.propertyRepo.delete({ id });
  }
}
