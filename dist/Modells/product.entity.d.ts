import { Model } from "sequelize-typescript";
import { OrderItem } from "./order_item.entity";
import { Review } from "./review.entity";
import { Comment } from "./comment.entity";
import { CartItem } from "./cart_item.entity";
export declare class Product extends Model {
    id: number;
    name: string;
    description: string;
    price: number;
    numberInStock: string;
    category: string;
    image: string;
    orderItems: OrderItem[];
    reviews: Review[];
    comments: Comment[];
    cartItems: CartItem[];
}
