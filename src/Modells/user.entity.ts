import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, HasOne} from "sequelize-typescript";
import { Order } from "./order.entity";
import {Cart} from "./cart.entity";

/**
 * Class of user.
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'users' })
export class User extends Model {
    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column({ type: DataType.STRING, allowNull: true,unique: true })
    email: string;

    @Column(DataType.STRING)
    password: string;

    @Column(DataType.STRING)
    salutation: string;

    @Column(DataType.STRING)
    street: string;

    @Column(DataType.INTEGER)
    houseNumber: number;

    @Column(DataType.STRING)
    zipCode: string;

    @Column(DataType.STRING)
    city: string;

    @Column(DataType.STRING)
    country: string;

    @Column(DataType.STRING)
    phone: string;

    @Column(DataType.DECIMAL)
    role: number;

    @Column(DataType.STRING)
    cookies: number;

    @HasOne(() => Cart, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
    })
    cart:Cart

}
