import { Property } from 'src/property/entities/property.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  username: 'postgres',
  password: 'root',
  database: 'newNestJs',
  synchronize: true, // for production change to false
};
