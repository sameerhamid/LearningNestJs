import * as schema from '../schema/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DrizzleDb = NodePgDatabase<typeof schema>;
