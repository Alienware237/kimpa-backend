import { CartItem } from "../../Modells/cart_item.entity";
export declare class CartItemService {
    private cartItemRepository;
    constructor(cartItemRepository: typeof CartItem);
    findAll(cartId: number): Promise<CartItem[]>;
    update(cartId: number, productId: number, createdAt: Date, newDetailsOfChoice: string): Promise<[affectedCount: number, affectedRows: CartItem[]]>;
    findOne(cartId: number, productId: number, productDetail: any): Promise<CartItem>;
    remove(cartId: number, productId: number, detailsOfChoice: string): Promise<number>;
    create(cartId: number, productId: any, productDetail: any): Promise<CartItem>;
}
