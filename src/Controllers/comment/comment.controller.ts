import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {CommentService} from "../../Services/comment/comment.service";
import {Comment} from "../../Modells/comment.entity";
import {CreateCommentDto} from "../../Modules/comment/dto/create-comment.dto";
import {UpdateCommentDto} from "../../Modules/comment/dto/update-comment.dto";


@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {
    }

    @Get('list')
    getAllProduct(): Promise<Comment[]> {
        return this.commentService.findAll();
    }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id);
    }
}