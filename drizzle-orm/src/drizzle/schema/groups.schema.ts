import {
  index,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core';
import { Users } from './user.schema';
import { relations } from 'drizzle-orm';

export const Groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

// this is the joint table
export const UsersToGroups = pgTable(
  'usersToGroups',
  {
    userId: integer('userId')
      .notNull()
      .references(() => Users.id),

    groupId: integer('groupId')
      .notNull()
      .references(() => Groups.id),
  },
  (table) => ({
    //   composit primaryKey
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
    userIdIndex: index('userIdIndex').on(table.userId),
  }),
);

export const UsersToGroupsRelations = relations(UsersToGroups, ({ one }) => ({
  user: one(Users, {
    fields: [UsersToGroups.userId],
    references: [Users.id],
  }),
  group: one(Groups, {
    fields: [UsersToGroups.groupId],
    references: [Groups.id],
  }),
}));
