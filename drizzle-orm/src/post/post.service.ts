import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { Posts } from 'src/drizzle/schema/posts.schema';
import { eq } from 'drizzle-orm';
import { Comments } from 'src/drizzle/schema/comments.schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    // return await this.db.select().from(Posts);
    return await this.db.query.Posts.findMany({
      where: (Posts, { eq }) => eq(Posts.id, 1),
      with: {
        author: {
          with: {
            userToGroups: {
              with: {
                group: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number) {
    // return await this.db.select().from(Posts).where(eq(Posts.id, id));
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.db
      .update(Posts)
      .set(updatePostDto)
      .where(eq(Posts.id, id));
  }

  async remove(id: number) {
    // Delete all comments related to the post
    await this.db.delete(Comments).where(eq(Comments.postId, id));
    return await this.db.delete(Posts).where(eq(Posts.id, id));
  }
}
