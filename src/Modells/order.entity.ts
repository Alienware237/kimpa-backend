import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { OrderItem } from "./order_item.entity";

/**
 * Class of order.
 *
 * Die Tabelle "Order" (auf Deutsch "Order") dient dazu, Informationen über
 * die Bestellungen von Benutzern in dem Onlineshop zu speichern
 *
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.DATE)
    orderDate!: Date;

    @Column(DataType.DECIMAL(10, 2))
    totalAmount!: number;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];
}