"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartProviders = void 0;
const cart_entity_1 = require("../Modells/cart.entity");
exports.cartProviders = [{
        provide: 'CART_REPOSITORY',
        useValue: cart_entity_1.Cart,
    }];
//# sourceMappingURL=cart.providers.js.map