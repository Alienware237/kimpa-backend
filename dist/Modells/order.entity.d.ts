import { Model } from "sequelize-typescript";
import { User } from "./user.entity";
import { OrderItem } from "./order_item.entity";
export declare class Order extends Model<Order> {
    userId: number;
    user: User;
    orderDate: Date;
    totalAmount: number;
    orderItems: OrderItem[];
}
