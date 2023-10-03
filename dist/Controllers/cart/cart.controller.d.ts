import { CartService } from "../../Services/cart/cart.service";
import { Cart } from "../../Modells/cart.entity";
import { UpdateCartDto } from "../../Modules/cart/dto/update-cart.dto";
import { CartDto } from "../../Modules/cart/dto/cart.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getAllProduct(): Promise<Cart[]>;
    create(cartDto: CartDto): Promise<Cart>;
    findAll(): Promise<Cart[]>;
    findOne(id: string): Promise<Cart>;
    update(id: string, updateCartDto: UpdateCartDto): string;
    remove(id: string): string;
}
