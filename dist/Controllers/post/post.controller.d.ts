import { PostService } from "../../Services/post/post.service";
import { Post as PostEntity } from "../../Modells/post.entity";
import { PostDto } from "../../Modules/posts/dto/post.dto";
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): Promise<PostEntity[]>;
    findOne(id: number): Promise<PostEntity>;
    create(post: PostDto, req: any): Promise<PostEntity>;
    update(id: number, post: PostDto, req: any): Promise<PostEntity>;
    remove(id: number, req: any): Promise<string>;
}
