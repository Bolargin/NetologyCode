import { Module } from '@nestjs/common';
import { BookCommentService } from './bookcomment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookComment, BookCommentSchema } from './schemas/bookcomment.schema';
import { Gateway } from './bookcomment.gateway';
import { BookCommentController } from './bookcomment.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentService, Gateway],
  controllers: [BookCommentController],
})
export class BookCommentModule {}
