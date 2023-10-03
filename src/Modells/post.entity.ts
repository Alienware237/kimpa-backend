import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Administrator} from "./administrator.entity";


@Table
export class Post extends Model<Post> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    body: string;

    @ForeignKey(() => Administrator)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    adminId: number;

    @BelongsTo(() => Administrator)
    admin: Administrator;
}