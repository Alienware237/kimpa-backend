import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
    AutoIncrement,
    PrimaryKey, HasOne
} from "sequelize-typescript";
import { OrderItem } from "./order_item.entity";
import { Review } from "./review.entity";
import { Comment } from "./comment.entity";
import { CartItem } from "./cart_item.entity";
import {ProductDto} from "../Modules/product/dto/product.dto";
import {Cart} from "./cart.entity";

/**
 * Class of product.
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'products' })
export class Product extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    description!: string;

    @Column(DataType.DECIMAL(10, 2))
    price!: number;

    @Column(DataType.STRING)
    numberInStock!: string;

    @Column(DataType.STRING)
    category!: string;

    @Column(DataType.TEXT("long"))
    image!: string;

    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];

    @HasMany(() => Review, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
    })
    reviews!: Review[];

    @HasMany(() => Comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
    })
    comments!: Comment[];

    @HasMany(() => CartItem)
    cartItems!: CartItem[];
}