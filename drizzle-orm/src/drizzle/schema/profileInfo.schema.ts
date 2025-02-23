import { integer, jsonb, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Users } from './user.schema';
export const profileInfo = pgTable('profileInfo', {
  id: serial('id').primaryKey(),
  metadata: jsonb('metadata'),
  userId: integer('userId').references(() => Users.id),
});
