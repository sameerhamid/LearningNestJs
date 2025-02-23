import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { Comments } from './comments.schema';
import { Posts } from './posts.schema';
import { profileInfo } from './profileInfo.schema';
import { UsersToGroups } from './groups.schema';

export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const UsersRealtions = relations(Users, ({ one, many }) => ({
  comments: many(Comments),
  posts: many(Posts),
  profile: one(profileInfo),
  userToGroups: many(UsersToGroups),
}));
