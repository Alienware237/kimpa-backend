"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModule = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("../../Services/cart-item/cart-item.service");
const cart_item_controller_1 = require("../../Controllers/cart-iterm/cart-item.controller");
const cart_item_providers_1 = require("../../Providers/cart-item.providers");
const cart_service_1 = require("../../Services/cart/cart.service");
const cart_providers_1 = require("../../Providers/cart.providers");
const product_service_1 = require("../../Services/product/product.service");
const product_providers_1 = require("../../Providers/product.providers");
const elasticsearch_module_1 = require("../elasticsearch/elasticsearch.module");
let CartItemModule = class CartItemModule {
};
CartItemModule = __decorate([
    (0, common_1.Module)({
        imports: [elasticsearch_module_1.ElasticsearchModule],
        controllers: [cart_item_controller_1.CartItemController],
        providers: [
            cart_item_service_1.CartItemService,
            cart_service_1.CartService,
            product_service_1.ProductService,
            ...cart_item_providers_1.cartitemProviders,
            ...cart_providers_1.cartProviders,
            ...product_providers_1.productProviders
        ]
    })
], CartItemModule);
exports.CartItemModule = CartItemModule;
//# sourceMappingURL=cart-item.module.js.map