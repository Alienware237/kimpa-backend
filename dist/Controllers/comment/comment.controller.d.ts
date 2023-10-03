import { CommentService } from "../../Services/comment/comment.service";
import { Comment } from "../../Modells/comment.entity";
import { CreateCommentDto } from "../../Modules/comment/dto/create-comment.dto";
import { UpdateCommentDto } from "../../Modules/comment/dto/update-comment.dto";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getAllProduct(): Promise<Comment[]>;
    create(createCommentDto: CreateCommentDto): string;
    findAll(): Promise<Comment[]>;
    findOne(id: string): string;
    update(id: string, updateCommentDto: UpdateCommentDto): string;
    remove(id: string): string;
}
