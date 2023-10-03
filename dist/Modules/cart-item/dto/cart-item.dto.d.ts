import { Cart } from "../../../Modells/cart.entity";
import { Product } from "../../../Modells/product.entity";
export declare class CartItemDto {
    readonly cartId: number;
    readonly productId: number;
    readonly cart: Cart;
    readonly product: Product;
    readonly quantity: number;
    readonly detailsOfChoice: string;
}
