import { Model } from "sequelize-typescript";
import { User } from "./user.entity";
import { CartItem } from "./cart_item.entity";
export declare class Cart extends Model<Cart> {
    userId: number;
    user: User;
    cartItems: CartItem[];
}
