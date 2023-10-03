import { CartItem } from "../Modells/cart_item.entity";

export const cartitemProviders = [{
    provide: 'CART_ITEM_REPOSITORY',
    useValue: CartItem,
}];