"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../../Services/order/order.service");
const order_controller_1 = require("../../Controllers/order/order.controller");
const order_providers_1 = require("../../Providers/order.providers");
const user_service_1 = require("../../Services/user/user.service");
const user_provider_1 = require("../../Providers/user.provider");
const cart_providers_1 = require("../../Providers/cart.providers");
const cart_service_1 = require("../../Services/cart/cart.service");
const order_item_service_1 = require("../../Services/order-item/order-item.service");
const order_item_providers_1 = require("../../Providers/order-item.providers");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [order_controller_1.OrderController],
        providers: [
            order_service_1.OrderService,
            user_service_1.UserService,
            cart_service_1.CartService,
            order_item_service_1.OrderItemService,
            ...order_providers_1.orderProviders,
            ...user_provider_1.userProviders,
            ...cart_providers_1.cartProviders,
            ...order_item_providers_1.orderItemProviders
        ]
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map