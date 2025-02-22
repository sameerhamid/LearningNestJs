import { faker } from '@faker-js/faker';
import { Property } from './../property/entities/property.entity';
import { PropertyFeature } from './../property/entities/propertyFeature.entity';
import { PropertyType } from './../property/entities/propertyType.entity';
import { User } from './../property/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const typeRepo = dataSource.getRepository(PropertyType);
    console.log('Seeding property types >>>>');
    const propertyTypes = await typeRepo.save([
      { value: 'House' },
      { value: 'Apartment' },
    ]);

    const UserFactory = factoryManager.get(User);

    console.log('Seeding users >>>>');

    const users = await UserFactory.saveMany(10);

    const PropertyFactory = factoryManager.get(Property);
    const PropertyFeatureFactory = factoryManager.get(PropertyFeature);

    console.log('Seeding users >>>>');

    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const property = await PropertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes),
            propertyFeature: await PropertyFeatureFactory.save(),
          });
          return property;
        }),
    );
    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(properties);
  }
}
