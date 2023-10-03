import { Post } from "../../Modells/post.entity";
import { PostDto } from "../../Modules/Posts/dto/post.dto";
export declare class PostsService {
    private readonly postRepository;
    constructor(postRepository: typeof Post);
    create(post: PostDto, adminId: any): Promise<Post>;
    findAll(): Promise<Post[]>;
    findOne(id: any): Promise<Post>;
    delete(id: any, adminId: any): Promise<number>;
    update(id: any, data: any, adminId: any): Promise<{
        numberOfAffectedRows: number;
        updatedPost: Post;
    }>;
}
