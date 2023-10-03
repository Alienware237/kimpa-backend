import { Article } from "../Modells/article.entity";
export declare class ArticleService {
    private articleRepository;
    constructor(articleRepository: typeof Article);
    findAll(): Promise<Article[]>;
}
