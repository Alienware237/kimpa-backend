import { Model } from "sequelize-typescript";
import { Cart } from "./cart.entity";
export declare class User extends Model {
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
    role: number;
    cookies: number;
    cart: Cart;
}
