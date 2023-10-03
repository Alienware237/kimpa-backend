import {Cart} from "../Modells/cart.entity";

export const cartProviders = [{
    provide: 'CART_REPOSITORY',
    useValue: Cart,
}];