"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProviders = void 0;
const order_entity_1 = require("../Modells/order.entity");
exports.orderProviders = [{
        provide: 'ORDER_REPOSITORY',
        useValue: order_entity_1.Order,
    }];
//# sourceMappingURL=order.providers.js.map