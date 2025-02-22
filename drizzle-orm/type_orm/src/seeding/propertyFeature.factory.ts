import { faker } from '@faker-js/faker';
import { PropertyFeature } from './../property/entities/propertyFeature.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, () => {
  const propertyFeature = new PropertyFeature();
  propertyFeature.area = faker.number.int({ min: 25, max: 2500 });
  propertyFeature.bathrooms = faker.number.int({ min: 1, max: 6 });
  propertyFeature.bedrooms = faker.number.int({ min: 1, max: 6 });
  propertyFeature.parkingSpots = faker.number.int({ min: 1, max: 3 });
  propertyFeature.hasBalcony = faker.datatype.boolean();
  propertyFeature.hasGarderYard = faker.datatype.boolean();
  propertyFeature.hasSwimmingPool = faker.datatype.boolean();

  return propertyFeature;
});
