"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartitemProviders = void 0;
const cart_item_entity_1 = require("../Modells/cart_item.entity");
exports.cartitemProviders = [{
        provide: 'CART_ITEM_REPOSITORY',
        useValue: cart_item_entity_1.CartItem,
    }];
//# sourceMappingURL=cart-item.providers.js.map