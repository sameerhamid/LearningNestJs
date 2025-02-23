import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { Posts } from 'src/drizzle/schema/posts.schema';

@Injectable()
export class PostService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  async findAll() {
    // return await this.db.select().from(Posts);
    return await this.db.query.Posts.findMany({
      with: { author: true },
    });
  }

  findOne(id: number) {
    // return await this.db.select().from(Posts).where(eq(Posts.id, id));
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
