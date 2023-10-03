import {Order} from "../Modells/order.entity";

export const orderProviders = [{
    provide: 'ORDER_REPOSITORY',
    useValue: Order,
}];