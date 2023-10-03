import { Model } from "sequelize-typescript";
import { User } from "./user.entity";
import { Product } from "./product.entity";
export declare class Comment extends Model<Comment> {
    userId: number;
    productId: number;
    user: User;
    product: Product;
    commentText: string;
    userData: string;
}
