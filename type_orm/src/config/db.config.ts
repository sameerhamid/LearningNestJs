import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { registerAs } from '@nestjs/config';
export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    type: 'postgres',
    host: 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // for production change to false
  }),
);
