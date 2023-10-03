import {Table, Column, Model, DataType} from "sequelize-typescript";

/**
 * Class of product.
 * @author Kevin Piam <kevinpiam3@yahoo.com>
 */

@Table({ tableName: 'administrator' })
export class Administrator extends Model {

    @Column(DataType.STRING)
    lastName: string;

    @Column(DataType.STRING)
    firstName: string;

    @Column(DataType.STRING)
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

}
