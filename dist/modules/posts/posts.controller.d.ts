import { PostsService } from "./posts.service";
import { Post as PostEntity } from "../../Modells/post.entity";
import { PostDto } from "../../Modules/Posts/dto/post.dto";
export declare class PostsController {
    private readonly postService;
    constructor(postService: PostsService);
    findAll(): Promise<PostEntity[]>;
    findOne(id: number): Promise<PostEntity>;
    create(post: PostDto, req: any): Promise<PostEntity>;
    update(id: number, post: PostDto, req: any): Promise<PostEntity>;
    remove(id: number, req: any): Promise<string>;
}
