import { Injectable, Inject } from "@nestjs/common";
import { CommentDto } from "../../Modules/comment/dto/comment.dto";
import {COMMENT_REPOSITORY} from "../../core/constants";
import {Comment} from "../../Modells/comment.entity";
import {CreateCommentDto} from "../../Modules/comment/dto/create-comment.dto";
import {UpdateCommentDto} from "../../Modules/comment/dto/update-comment.dto";

@Injectable()
export class CommentService {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private productRepository: typeof Comment
    ) {
    }

    async findAll(): Promise<Comment[]> {
        return this.productRepository.findAll<Comment>();
    }

    create(createCommentDto: CreateCommentDto) {
        return 'This action adds a new comment';
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}