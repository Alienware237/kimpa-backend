import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import {Cart} from "../../../Modells/cart.entity";
import {Product} from "../../../Modells/product.entity";

export class CartItemDto {

    @IsNotEmpty()
    readonly cartId!: number;

    @IsNotEmpty()
    readonly productId!: number;

    @IsNotEmpty()
    readonly cart!: Cart;

    @IsNotEmpty()
    readonly product!: Product;

    @IsNotEmpty()
    readonly quantity!: number;

    @IsNotEmpty()
    readonly detailsOfChoice!: string;
}
