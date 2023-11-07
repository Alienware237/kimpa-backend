"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../Services/user/user.service");
const user_controller_1 = require("../../Controllers/user/user.controller");
const user_provider_1 = require("../../Providers/user.provider");
const cart_service_1 = require("../../Services/cart/cart.service");
const cart_providers_1 = require("../../Providers/cart.providers");
const cart_item_providers_1 = require("../../Providers/cart-item.providers");
const cart_item_service_1 = require("../../Services/cart-item/cart-item.service");
const product_service_1 = require("../../Services/product/product.service");
const product_providers_1 = require("../../Providers/product.providers");
const elasticsearch_module_1 = require("../elasticsearch/elasticsearch.module");
const elasticsearch_service_1 = require("../../Services/elasticsearch/elasticsearch.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [elasticsearch_module_1.ElasticsearchModule],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            cart_service_1.CartService,
            cart_item_service_1.CartItemService,
            product_service_1.ProductService,
            elasticsearch_service_1.ElasticsearchIndexingService,
            ...user_provider_1.userProviders,
            ...cart_providers_1.cartProviders,
            ...cart_item_providers_1.cartitemProviders,
            ...product_providers_1.productProviders,
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map