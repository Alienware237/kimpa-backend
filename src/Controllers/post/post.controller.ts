import {Body, Controller, Get, Post, NotFoundException, Param, UseGuards, Request, Put, Delete} from '@nestjs/common';
import {PostService} from "../../Services/post/post.service";
import {Post as PostEntity} from "../../Modells/post.entity";
import {AuthGuard} from "@nestjs/passport";
import {PostDto} from "../../Modules/posts/dto/post.dto";

@Controller('posts')
export class PostController {

    constructor(private readonly postService: PostService) {}

    @Get()
    async findAll() {
        // Get all post in the db
        return await this.postService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostEntity> {
        // Find the post with this id
        const post = await this.postService.findOne(id);

        if (!post) {
            throw new NotFoundException('This post doesn\'t exist');
        }

        // if post exist, return the post
        return post;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // create a new post and return the newly created post
        return await this.postService.create(post, req.admin.adminId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // Get the number of row affected and the update post
        const { numberOfAffectedRows, updatedPost } = await this.postService.update(id, post, req.admin.adminId);

        // if the number of row affected is zero,
        // it means the post doesn't exist in our db
        if(numberOfAffectedRows === 0) {
            throw new NotFoundException('This post doesn\'t exist');
        }

        // Return the updated post
        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req) {
        // Delete the post with this id
        const deleted = await this.postService.delete(id, req.adminId);

        // If the number oft row affected is zero,
        // then the post doesn't exist in our db
        if (deleted === 0) {
            throw new Notification('this Post doesn\'t exist');
        }

        // Return success message
        return 'Successfully deleted';
    }
}
