import { CartDto } from "../../Modules/cart/dto/cart.dto";
import { Cart } from "../../Modells/cart.entity";
import { UpdateCartDto } from "../../Modules/cart/dto/update-cart.dto";
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: typeof Cart);
    findAll(): Promise<Cart[]>;
    create(cartDto: CartDto): Promise<Cart>;
    findOne(userId: number): Promise<Cart>;
    update(id: number, updateCartDto: UpdateCartDto): string;
    remove(id: number): string;
}
