"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../../Services/product/product.service");
const product_controller_1 = require("../../Controllers/product/product.controller");
const product_providers_1 = require("../../Providers/product.providers");
const jwt_strategy_1 = require("../auth/jwt.strategy");
const administrator_service_1 = require("../../Services/administrator/administrator.service");
const auth_service_1 = require("../../Services/auth/auth.service");
const administrator_providers_1 = require("../../Providers/administrator.providers");
const user_service_1 = require("../../Services/user/user.service");
const jwt_1 = require("@nestjs/jwt");
const user_provider_1 = require("../../Providers/user.provider");
const cart_service_1 = require("../../Services/cart/cart.service");
const cart_providers_1 = require("../../Providers/cart.providers");
const elasticsearch_module_1 = require("../elasticsearch/elasticsearch.module");
const cart_item_providers_1 = require("../../Providers/cart-item.providers");
const cart_item_service_1 = require("../../Services/cart-item/cart-item.service");
const elasticsearch_service_1 = require("../../Services/elasticsearch/elasticsearch.service");
const backblaze_service_1 = require("../../Services/Backblaze/backblaze.service");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [elasticsearch_module_1.ElasticsearchModule],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService,
            jwt_strategy_1.JwtStrategy,
            administrator_service_1.AdministratorService,
            auth_service_1.AuthService,
            user_service_1.UserService,
            cart_service_1.CartService,
            cart_item_service_1.CartItemService,
            jwt_1.JwtService,
            elasticsearch_service_1.ElasticsearchIndexingService,
            backblaze_service_1.BackblazeService,
            ...product_providers_1.productProviders,
            ...administrator_providers_1.administratorProviders,
            ...user_provider_1.userProviders,
            ...cart_providers_1.cartProviders,
            ...cart_item_providers_1.cartitemProviders
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map