import {Comment} from "../Modells/comment.entity";

export const commentProviders = [{
    provide: 'COMMENT_REPOSITORY',
    useValue: Comment,
}];