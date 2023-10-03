import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { CartItem } from "./cart_item.entity";

/**
 * Class of cart.
 *
 * Die Tabelle "Cart" (auf Deutsch "Warenkorb") dient dazu, die Warenkörbe
 * der Benutzer in dem Onlineshop zu verwalten.
 *
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @HasMany(() => CartItem, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    cartItems!: CartItem[];
}