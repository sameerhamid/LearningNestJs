import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Users } from './user.schema';
import { Posts } from './posts.schema';

export const Comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('test').notNull(),
  authorId: integer('authorId').references(() => Users.id),
  postId: integer('postId').references(() => Posts.id),
});
