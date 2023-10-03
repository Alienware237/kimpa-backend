import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import {Product} from "../../../Modells/product.entity";
import {User} from "../../../Modells/user.entity";

export class CommentDto {

    @IsNotEmpty()
    readonly userId!: number;

    @IsNotEmpty()
    readonly productId!: number;

    @IsNotEmpty()
    readonly user!: User;

    @IsNotEmpty()
    readonly product!: Product;

    @IsNotEmpty()
    readonly commentText!: string;

    @IsNotEmpty()
    readonly userData!: string;
}