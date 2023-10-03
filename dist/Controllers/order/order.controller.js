"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../../Services/order/order.service");
const update_order_dto_1 = require("../../Modules/order/dto/update-order.dto");
const user_service_1 = require("../../Services/user/user.service");
const order_item_service_1 = require("../../Services/order-item/order-item.service");
let OrderController = class OrderController {
    constructor(orderService, userService, orderItemService) {
        this.orderService = orderService;
        this.userService = userService;
        this.orderItemService = orderItemService;
    }
    getAllOrder() {
        return this.orderService.findAll();
    }
    async create(createOrderDto) {
        console.log('createOrderDto: ', createOrderDto);
        const products = createOrderDto.data.products;
        const user = createOrderDto.data.user;
        const total = createOrderDto.data.totalAmount;
        console.log('createOrderDto.data.products: ', products);
        await this.userService.update(user.id, user);
        let orderItem = [];
        const order = await this.orderService.create({
            id: user.id,
            totalAmount: total
        }).then(async (ord) => {
            if (Array.isArray(products)) {
                console.log('New order: ', ord);
                let index = 0;
                products.forEach(product => {
                    orderItem[index] = this.orderItemService.create({
                        orderId: ord.dataValues.id,
                        productId: product.id,
                        quantity: product.detailsOfChoice.quantity,
                        unitPrice: product.price
                    });
                    ++index;
                });
            }
            else {
                orderItem[0] = await this.orderItemService.create({
                    orderId: ord.dataValues.id,
                    productId: products.id,
                    quantity: products.detailsOfChoice.quantity,
                    unitPrice: products.price
                });
            }
        });
        return orderItem;
    }
    findOne(id) {
        return this.orderService.findOne(+id);
    }
    update(id, updateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }
    remove(id) {
        return this.orderService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrder", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        user_service_1.UserService,
        order_item_service_1.OrderItemService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map