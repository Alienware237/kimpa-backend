import { Product } from "../../../Modells/product.entity";
import { User } from "../../../Modells/user.entity";
export declare class CommentDto {
    readonly userId: number;
    readonly productId: number;
    readonly user: User;
    readonly product: Product;
    readonly commentText: string;
    readonly userData: string;
}
