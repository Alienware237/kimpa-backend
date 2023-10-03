import { Comment } from "../../Modells/comment.entity";
import { CreateCommentDto } from "../../Modules/comment/dto/create-comment.dto";
import { UpdateCommentDto } from "../../Modules/comment/dto/update-comment.dto";
export declare class CommentService {
    private productRepository;
    constructor(productRepository: typeof Comment);
    findAll(): Promise<Comment[]>;
    create(createCommentDto: CreateCommentDto): string;
    findOne(id: number): string;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}
