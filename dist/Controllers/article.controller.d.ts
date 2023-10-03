import { ArticleService } from "../Services/article.service";
import { Article } from "../Modells/article.entity";
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getAllArticle(): Promise<Article[]>;
}
