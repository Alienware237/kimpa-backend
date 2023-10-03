import {Inject, Injectable} from '@nestjs/common';
import {POST_REPOSITORY} from "../../core/constants";
import {Post} from "../../Modells/post.entity";
import {PostDto} from "../../Modules/posts/dto/post.dto";
import {Administrator} from "../../Modells/administrator.entity";

@Injectable()
export class PostService {

    constructor(@Inject(POST_REPOSITORY) private readonly postRepository: typeof Post) {}

    async create(post: PostDto, adminId): Promise<Post> {
        return await this.postRepository.create<Post>({ ...post, adminId});
    }

    async findAll(): Promise<Post[]> {
        return await this.postRepository.findAll<Post>({
            include: [{model: Administrator, attributes: { exclude: ['password']}}],
        });
    }

    async findOne(id): Promise<Post> {
        return await this.postRepository.findOne({
            rejectOnEmpty: undefined,
            where: { id },
            include: [{model: Administrator, attributes: { exclude: ['password']}}]
        });
    }

    async delete(id, adminId) {
        return await this.postRepository.destroy({ where: {id, adminId}});
    }
    async update(id, data, adminId) {
        const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update({ ...data }, { where: { id, adminId }, returning: true});

        return {numberOfAffectedRows, updatedPost};
    }
}
