import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import {BelongsTo, Column, DataType, ForeignKey} from "sequelize-typescript";
import {Product} from "../../../Modells/product.entity";
import {User} from "../../../Modells/user.entity";

export class ReviewDto {

    @IsNotEmpty()
    readonly userId!: number;

    @IsNotEmpty()
    readonly productId!: number;

    @IsNotEmpty()
    readonly user!: User;

    @IsNotEmpty()
    readonly product!: Product;

    @IsNotEmpty()
    readonly reviewText!: string;

    @IsNotEmpty()
    readonly rating!: number;

    @IsNotEmpty()
    readonly userData!: string;
}