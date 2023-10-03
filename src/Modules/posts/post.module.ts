import { Module } from '@nestjs/common';
import {PostService} from "../../Services/post/post.service";
import {postProviders} from "../../Providers/post.providers";
import {PostController} from "../../Controllers/post/post.controller";

@Module({
    providers: [PostService, ...postProviders],
    controllers: [PostController],
})
export class PostsModule {}
