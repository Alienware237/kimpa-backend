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
const mail_service_1 = require("../../Services/mails/mail.service");
let OrderController = class OrderController {
    constructor(orderService, userService, orderItemService, mailService) {
        this.orderService = orderService;
        this.userService = userService;
        this.orderItemService = orderItemService;
        this.mailService = mailService;
    }
    getAllOrder() {
        return this.orderService.findAll();
    }
    async create(createOrderDto) {
        console.log('createOrderDto: ', createOrderDto);
        const products = createOrderDto.data.products;
        const user = createOrderDto.data.user;
        user.houseNumber = parseInt(user.houseNumber);
        user.role = parseInt(user.role);
        const total = createOrderDto.data.totalAmount;
        const orderText = [];
        orderText.push("Hey " + user.firstName + "\n");
        orderText.push("Your order at Boutique Kimpa has been successfully processed. " +
            "You will receive in the next 4 days the articles in the following table: \n");
        orderText.push('| Name        | Quantity | Price  | Amount |');
        orderText.push('|-------------|----------|--------|--------|');
        console.log('createOrderDto.data.products: ', products);
        console.log('createUserDto.data.user: ', user);
        await this.userService.update(user.id, user);
        let orderItem = [];
        const order = await this.orderService.create({
            id: user.id,
            totalAmount: total
        }).then(async (ord) => {
            if (Array.isArray(products)) {
                console.log('New order: ', ord);
                let index = 0;
                for (const product of products) {
                    orderItem[index] = await this.orderItemService.create({
                        orderId: ord.dataValues.id,
                        productId: product.id,
                        quantity: product.detailsOfChoice.quantity,
                        unitPrice: product.price
                    });
                    const amount = product.detailsOfChoice.quantity * product.price;
                    orderText.push(`| ${product.name} | ${product.detailsOfChoice.quantity}        | ${product.price}€      | ${amount}€      |`);
                    ++index;
                }
                orderText.push('| Total                           |             |             | ' + (total < 100 ? total + ' + 3€' : total + '€') + '      |');
                orderText.push('\n' + 'We look forward to your next visit! \n');
                orderText.push('\n Best Regard \n Kimpa');
                await this.mailService.sendMailForCheckout(user.email, 'Your order at the Kimpa shop', orderText);
            }
            else {
                orderItem[0] = await this.orderItemService.create({
                    orderId: ord.dataValues.id,
                    productId: products.id,
                    quantity: products.detailsOfChoice.quantity,
                    unitPrice: products.price
                });
                const amount = products.detailsOfChoice.quantity * products.price;
                orderText.push(`| ${products.name} | ${products.detailsOfChoice.quantity}        | ${products.price}      | ${amount}      |`);
                orderText.push('| Total                         |             |             | ' + total + '€      |');
                orderText.push('\n' + 'We look forward to your next visit! \n');
                orderText.push('\n Best Regard \n Kimpa');
                await this.mailService.sendMailForCheckout(user.email, 'Your order at the Kimpa shop', orderText);
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
        order_item_service_1.OrderItemService,
        mail_service_1.MailService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map