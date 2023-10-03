import { Model } from "sequelize-typescript";
export declare class Article extends Model {
    articleId: number;
    name: string;
    price: number;
    weight: number;
    description: string;
    image: string;
}
