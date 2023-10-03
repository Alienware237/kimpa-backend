import { CartItemService } from '../../Services/cart-item/cart-item.service';
import { UpdateCartItemDto } from '../../Modules/cart-item/dto/update-cart-item.dto';
import { CartService } from "../../Services/cart/cart.service";
import { ProductService } from "../../Services/product/product.service";
export declare class CartItemController {
    private readonly cartItemService;
    private readonly cartService;
    private readonly productService;
    constructor(cartItemService: CartItemService, cartService: CartService, productService: ProductService);
    findAllItem(userId: number): Promise<{
        dataItemInCart: any[];
        cartId: any;
    }>;
    update(id: string, updateCartItemDto: UpdateCartItemDto): void;
    InsertOne(userId: number, productId: number, productDetail: any): Promise<import("../../Modells/cart_item.entity").CartItem | [affectedCount: number, affectedRows: import("../../Modells/cart_item.entity").CartItem[]]>;
    updateData(idOfCart: number, updatedData: any): Promise<void>;
    removeCartItem(userId: number, productId: number, detailsOfChoice: any): Promise<number>;
}
