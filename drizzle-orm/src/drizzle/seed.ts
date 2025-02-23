import 'dotenv/config';

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  const userIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async (_, i) => {
        const user = await db
          .insert(schema.Users)
          .values({
            name: faker.person.firstName() + ' ' + faker.person.lastName(),
            email: faker.internet.email(),
            password: '',
          })
          .returning();

        return user[0].id;
      }),
  );

  const postIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async (_, i) => {
        const post = await db
          .insert(schema.Posts)
          .values({
            content: faker.lorem.paragraph(),
            title: faker.lorem.sentence(),
            authorId: faker.helpers.arrayElement(userIds),
          })
          .returning();

        return post[0].id;
      }),
  );

  await Promise.all(
    Array(50)
      .fill('')
      .map(async (_, i) => {
        const comments = await db
          .insert(schema.Comments)
          .values({
            text: faker.lorem.paragraph(),
            authorId: faker.helpers.arrayElement(userIds),
            postId: faker.helpers.arrayElement(postIds),
          })
          .returning();
        return comments[0].id;
      }),
  );

  const insertedGroups = await db
    .insert(schema.Groups)
    .values([{ name: 'JS' }, { name: 'TS' }])
    .returning();

  const groupIds = insertedGroups.map((group) => group.id);

  await Promise.all(
    userIds.map(async (userId) => {
      await db
        .insert(schema.UsersToGroups)
        .values({
          userId,
          groupId: faker.helpers.arrayElement(groupIds),
        })
        .returning();
    }),
  );
}

main()
  .then(() => {})
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
