import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { Product } from "./product.entity";


/**
 * Class of review.
 *
 * Die Tabelle "review" dient dazu, Bewertungen von Benutzern für bestimmte
 * Produkte in dem Onlineshop zu speichern. Jede Zeile in der "review"-Tabelle
 * repräsentiert eine einzelne Review und enthält Informationen wie den Benutzer,
 * das Produkt, den Bewertungstext und die Bewertungspunktzahl.
 *
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'reviews' })
export class Review extends Model<Review> {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId!: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Product)
    product!: Product;

    @Column(DataType.STRING)
    reviewText!: string;

    @Column(DataType.INTEGER)
    rating!: number;

    @Column(DataType.STRING)
    userData!: string;
}