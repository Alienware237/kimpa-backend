import { Product } from "../../../Modells/product.entity";
import { User } from "../../../Modells/user.entity";
export declare class ReviewDto {
    readonly userId: number;
    readonly productId: number;
    readonly user: User;
    readonly product: Product;
    readonly reviewText: string;
    readonly rating: number;
    readonly userData: string;
}
