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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
const sequelize_1 = require("sequelize");
let CartItemService = class CartItemService {
    constructor(cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }
    async findAll(cartId) {
        console.log('cart.id: ', cartId);
        return await this.cartItemRepository.findAll({ where: { cartId } });
    }
    update(cartId, productId, createdAt, newDetailsOfChoice) {
        const detailparsed = JSON.parse(newDetailsOfChoice);
        console.log('cartId: ', cartId);
        console.log('detailparsed.quantity: ', detailparsed.quantity);
        console.log('detailparsed.productId: ', productId);
        console.log('detailparsed.newDetailsOfChoice: ', newDetailsOfChoice);
        console.log('createdAt: ', createdAt);
        return this.cartItemRepository.update({ quantity: detailparsed.quantity,
            detailsOfChoice: newDetailsOfChoice,
            updatedAt: new Date()
        }, { returning: undefined, where: { cartId, productId, createdAt } });
    }
    async findOne(cartId, productId, productDetail) {
        const substring = `"selectedSize":"${productDetail.selectedSize}"`;
        console.log('substring: ', substring);
        return await this.cartItemRepository.findOne({
            rejectOnEmpty: undefined,
            where: {
                cartId,
                productId,
                detailsOfChoice: {
                    [sequelize_1.Op.like]: `%${substring}%`
                }
            }
        });
    }
    async remove(cartId, productId, detailsOfChoice) {
        console.log('Calling remove function for cartId: ' + cartId);
        const substring = `"selectedSize":"${JSON.parse(detailsOfChoice).selectedSize}"`;
        return await this.cartItemRepository.destroy({
            where: { productId,
                cartId,
                detailsOfChoice: {
                    [sequelize_1.Op.like]: `%${substring}%`
                }
            }
        });
    }
    create(cartId, productId, productDetail) {
        const detail = JSON.stringify({ selectedSize: productDetail.selectedSize, quantity: productDetail.quantity });
        const cartItem = {
            cartId: cartId,
            productId: productId,
            quantity: productDetail.quantity,
            detailsOfChoice: detail
        };
        return this.cartItemRepository.create(cartItem);
    }
};
CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CART_ITEM_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CartItemService);
exports.CartItemService = CartItemService;
//# sourceMappingURL=cart-item.service.js.map