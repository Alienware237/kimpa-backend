import { Model } from "sequelize-typescript";
import { Administrator } from "./administrator.entity";
export declare class Post extends Model<Post> {
    title: string;
    body: string;
    adminId: number;
    admin: Administrator;
}
