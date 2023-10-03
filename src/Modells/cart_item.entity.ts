import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Cart } from "./cart.entity";
import {Product } from "./product.entity";

/**
 * Class of cart_item.
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'cart_items' })
export class CartItem extends Model<CartItem> {
    @ForeignKey(() => Cart)
    @Column(DataType.INTEGER)
    cartId!: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId!: number;

    @BelongsTo(() => Cart)
    cart!: Cart;

    @BelongsTo(() => Product)
    product!: Product;

    @Column(DataType.INTEGER)
    quantity!: number;

    @Column(DataType.STRING)
    detailsOfChoice!: string;
}