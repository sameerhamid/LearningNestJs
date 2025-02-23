import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Users } from './user.schema';
import { relations } from 'drizzle-orm';
import { Comments } from './comments.schema';

export const Posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: integer('authorId').references(() => Users.id),
});

export const PostsRelations = relations(Posts, ({ one, many }) => ({
  author: one(Users, {
    fields: [Posts.authorId],
    references: [Users.id],
  }),

  comments: many(Comments),
}));
