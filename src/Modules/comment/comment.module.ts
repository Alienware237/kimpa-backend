import { Module } from '@nestjs/common';
import { CommentService } from '../../Services/comment/comment.service';
import { CommentController } from '../../Controllers/comment/comment.controller';
import {commentProviders} from "../../Providers/comment.providers";

@Module({
  controllers: [CommentController],
  providers: [CommentService, ...commentProviders]
})
export class CommentModule {}
