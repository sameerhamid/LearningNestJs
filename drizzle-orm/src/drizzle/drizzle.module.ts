import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/schema';
import { DrizzleDb } from './types/drizzle';

export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get('DATABASE_URL');
        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: false,
        });
        return drizzle(pool, { schema }) as DrizzleDb;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
