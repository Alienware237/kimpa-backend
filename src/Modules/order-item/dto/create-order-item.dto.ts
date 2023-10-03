import {IsNotEmpty} from "class-validator";
import {Cart} from "../../../Modells/cart.entity";
import {Product} from "../../../Modells/product.entity";

export class CreateOrderItemDto {

    @IsNotEmpty()
    readonly orderId!: number;

    @IsNotEmpty()
    readonly productId!: number;

    @IsNotEmpty()
    readonly quantity!: number;

    @IsNotEmpty()
    readonly unitPrice!: number;
}
