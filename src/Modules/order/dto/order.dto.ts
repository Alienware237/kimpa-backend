import {IsEmail, IsEnum, IsNotEmpty, MinLength} from "class-validator";
import {BelongsTo, Column, DataType, HasMany} from "sequelize-typescript";
import {User} from "../../../Modells/user.entity";
import {OrderItem} from "../../../Modells/order_item.entity";

export class OrderDto {

    @IsNotEmpty()
    private userId!: number;

    @IsNotEmpty()
    private user!: User;

    @IsNotEmpty()
    private orderDate!: Date;

    @IsNotEmpty()
    private totalAmount!: number;

    @IsNotEmpty()
    private orderItems!: OrderItem[];

    getUserId(): number {
        return this.userId;
    }

    setUserId(value: number) {
        this.userId = value;
    }

    getOrderDate(): Date {
        return this.orderDate;
    }

    setOrderDate(value: Date) {
        this.orderDate = value;
    }

    getTotalAmount(): number {
        return this.totalAmount;
    }

    setTotalAmount(value: number) {
        this.totalAmount = value;
    }
}