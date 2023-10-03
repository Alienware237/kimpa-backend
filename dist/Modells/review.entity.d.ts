import { Model } from "sequelize-typescript";
import { User } from "./user.entity";
import { Product } from "./product.entity";
export declare class Review extends Model<Review> {
    userId: number;
    productId: number;
    user: User;
    product: Product;
    reviewText: string;
    rating: number;
    userData: string;
}
