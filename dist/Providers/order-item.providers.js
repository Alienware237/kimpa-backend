"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemProviders = void 0;
const order_item_entity_1 = require("../Modells/order_item.entity");
exports.orderItemProviders = [{
        provide: 'ORDER_ITEM_REPOSITORY',
        useValue: order_item_entity_1.OrderItem,
    }];
//# sourceMappingURL=order-item.providers.js.map