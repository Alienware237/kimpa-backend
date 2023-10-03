import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

/**
 * Class of order_item.
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
    @ForeignKey(() => Order)
    @Column(DataType.INTEGER)
    orderId!: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId!: number;

    @BelongsTo(() => Order)
    order!: Order;

    @BelongsTo(() => Product)
    product!: Product;

    @Column(DataType.INTEGER)
    quantity!: number;

    @Column(DataType.DECIMAL(10, 2))
    unitPrice!: number;
}