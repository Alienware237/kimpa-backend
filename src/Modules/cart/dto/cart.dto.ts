import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import {User} from "../../../Modells/user.entity";
import {CartItem} from "../../../Modells/cart_item.entity";

export class CartDto {

    @IsNotEmpty()
    userId!: number;

    getUserId(): number {
        return this.userId;
    }

    setUserId(id: number) {
        this.userId = id;
    }
}