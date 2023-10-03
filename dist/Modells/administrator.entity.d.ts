import { Model } from "sequelize-typescript";
export declare class Administrator extends Model {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    salutation: string;
    street: string;
    houseNumber: number;
    zipCode: string;
    city: string;
    country: string;
    phone: string;
}
