import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { User } from "./user.entity";
import { Product } from "./product.entity";

/**
 * Class of comment.
 *
 * Im Gegensatz zu Bewertungen(review), die normalerweise eine generelle Einschätzung order
 * Review eines Produkts darstellen, ermöglichen Kommentare den Benutzern,
 * spezifische Anmerkungen, Fragen order Diskussionen zu einem Produkt zu hinterlassen.
 *
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment> {
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
    commentText!: string;

    @Column(DataType.STRING)
    userData!: string;
}