import { faker } from '@faker-js/faker';
import { Property } from './../property/entities/property.entity';

import { setSeederFactory } from 'typeorm-extension';

export const PropertyFactory = setSeederFactory(Property, () => {
  const property = new Property();
  property.name = faker.company.name();
  property.description = faker.lorem.sentence();
  property.price = faker.commerce.price({ min: 10000, max: 1000000 });
  return property;
});
