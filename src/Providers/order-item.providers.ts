import {OrderItem} from "../Modells/order_item.entity";

export const orderItemProviders = [{
    provide: 'ORDER_ITEM_REPOSITORY',
    useValue: OrderItem,
}];