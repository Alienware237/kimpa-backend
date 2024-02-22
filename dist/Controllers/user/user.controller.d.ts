import { UserService } from "../../Services/user/user.service";
import { UpdateUserDto } from "../../Modules/user/dto/update-user.dto";
import { User } from "../../Modells/user.entity";
import { CartService } from "../../Services/cart/cart.service";
import { CartItemService } from "../../Services/cart-item/cart-item.service";
import { ProductService } from "../../Services/product/product.service";
export declare class UserController {
    private readonly userService;
    private readonly cartService;
    private readonly cartItemsService;
    private readonly productService;
    constructor(userService: UserService, cartService: CartService, cartItemsService: CartItemService, productService: ProductService);
    getAllUser(): Promise<User[]>;
    create(userDto: any): Promise<User>;
    logIn(email: string, password: string, logInCookie: string): Promise<{
        user: any;
        data: any[];
    }>;
    getUserByCookie(cookie: string): Promise<{
        user: User;
        data: any[];
    }>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): Promise<[affectedCount: number, affectedRows: User[]]>;
    remove(id: string): string;
    updateUser(userId: number, userDto: any): Promise<[affectedCount: number, affectedRows: User[]]>;
}
