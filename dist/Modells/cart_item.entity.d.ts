import { Model } from "sequelize-typescript";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";
export declare class CartItem extends Model<CartItem> {
    cartId: number;
    productId: number;
    cart: Cart;
    product: Product;
    quantity: number;
    detailsOfChoice: string;
}
