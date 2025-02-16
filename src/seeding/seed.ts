import { pgConfig } from './../../dbConfig';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { PropertyFactory } from './property.factory';
import { UserFactory } from './user.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { MainSeeder } from './main.seed';

const options: DataSourceOptions & SeederOptions = {
  ...pgConfig,
  factories: [PropertyFactory, UserFactory, PropertyFeatureFactory],
  seeds: [MainSeeder],
};

const dataSrouce = new DataSource(options);

dataSrouce.initialize().then(async () => {
  await dataSrouce.synchronize(true);
  await runSeeders(dataSrouce);
  process.exit();
});
