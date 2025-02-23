import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Users } from './user.schema';

export const Posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('authorId').references(() => Users.id),
});
