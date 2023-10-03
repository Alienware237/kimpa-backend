import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import {Column, DataType, HasMany} from "sequelize-typescript";
import {OrderItem} from "../../../Modells/order_item.entity";
import {Review} from "../../../Modells/review.entity";
import {Comment} from "../../../Modells/comment.entity";
import {CartItem} from "../../../Modells/cart_item.entity";
import { Buffer } from "buffer"

export class ProductDto {
    @IsNotEmpty()
    private _name!: string;

    @IsNotEmpty()
    private _description!: string;

    @IsNotEmpty()
    private _price!: number;

    @IsNotEmpty()
    private _category!: string;

    @IsNotEmpty()
    private _image!: string;

    @IsNotEmpty()
    private _numberInStock!: number;

    getName(): string {
        return this._name;
    }

    setName(name: string) {
        this._name = name;
    }

    getDescription(): string {
        return this._description;
    }

    setDescription(description: string) {
        this._description = description;
    }

    getPrice(): number {
        return this._price;
    }

    setPrice(price: number) {
        this._price = price;
    }

    getNumberInStock(): number {
        return this._numberInStock;
    }

    setNumberInStock(numberInStock: number) {
        this._numberInStock = numberInStock;
    }

    getCategory(): string {
        return this._category;
    }

    setCategory(category: string) {
        this._category = category;
    }

    getImage(): string {
        return this._image;
    }

    setImage(image: string) {
        this._image = image;
    }

}
