import { Model } from "sequelize-typescript";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
export declare class OrderItem extends Model<OrderItem> {
    orderId: number;
    productId: number;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: number;
}
