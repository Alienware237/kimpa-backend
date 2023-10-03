"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productProviders = void 0;
const product_entity_1 = require("../Modells/product.entity");
exports.productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useValue: product_entity_1.Product,
    },
];
//# sourceMappingURL=product.providers.js.map