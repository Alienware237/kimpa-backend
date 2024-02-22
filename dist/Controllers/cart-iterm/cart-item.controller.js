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
exports.CartItemController = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("../../Services/cart-item/cart-item.service");
const update_cart_item_dto_1 = require("../../Modules/cart-item/dto/update-cart-item.dto");
const cart_service_1 = require("../../Services/cart/cart.service");
const product_service_1 = require("../../Services/product/product.service");
let CartItemController = class CartItemController {
    constructor(cartItemService, cartService, productService) {
        this.cartItemService = cartItemService;
        this.cartService = cartService;
        this.productService = productService;
    }
    async findAllItem(userId) {
        console.log('param1: ', userId);
        try {
            const cart = await this.cartService.findOne(userId);
            console.log('cart.id: ', cart);
            const itemInCarts = await this.cartItemService.findAll(cart.id);
            const listOfArticle = [];
            const dataItemInCart = [];
            let index = 0;
            for (const itemC of itemInCarts) {
                await this.productService.findById(itemC.dataValues.productId)
                    .then(articles => {
                    console.log('article by for loop:', articles);
                    const article = articles.dataValues;
                    console.log('itemC.details' + 'OfChoice ' + index, ': ', itemC.detailsOfChoice);
                    console.log('article In Item ' + index + ' befor: ', article);
                    article['insertedAt'] = itemC.createdAt;
                    article['numberOfArticle'] = itemC.quantity;
                    article['detailsOfChoice'] = itemC.detailsOfChoice;
                    console.log('article In Item ' + index + ' After: ', article);
                    ++index;
                    dataItemInCart.push(article);
                }).catch(err => {
                    console.log('error occurred by collect articles in cart: ', err);
                });
            }
            return { dataItemInCart, cartId: cart.id };
        }
        catch (error) {
            console.error('Error finding user and cart:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }
    update(id, updateCartItemDto) {
    }
    async InsertOne(userId, productId, productDetail) {
        console.log('productDetail: ', productDetail);
        const cart = await this.cartService.findOne(userId);
        console.log('cart.id: ', cart.id);
        const cartItemExist = await this.cartItemService.findOne(cart.id, productId, productDetail);
        console.log('cartItemExist: ', cartItemExist);
        if (cartItemExist) {
            return this.cartItemService.update(cart.id, productId, cartItemExist.dataValues.createdAt, JSON.stringify(productDetail));
        }
        return this.cartItemService.create(cart.id, productId, productDetail);
    }
    async updateData(idOfCart, updatedData) {
        console.log('updatedData: ', updatedData);
        for (const article of updatedData) {
            await this.cartItemService.update(idOfCart, article.id, article.insertedAt, JSON.stringify({ selectedSize: article.detailsOfChoice.selectedSize, quantity: article.numberOfArticle }));
        }
    }
    async removeCartItem(userId, productId, detailsOfChoice) {
        console.log('detailsOfChoice: ', detailsOfChoice);
        const cartId = (await this.cartService.findOne(userId)).dataValues.id;
        return this.cartItemService.remove(cartId, productId, JSON.stringify(detailsOfChoice));
    }
};
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartItemController.prototype, "findAllItem", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "update", null);
__decorate([
    (0, common_1.Put)('/:userId/:productId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CartItemController.prototype, "InsertOne", null);
__decorate([
    (0, common_1.Put)(':idOfCart'),
    __param(0, (0, common_1.Param)('idOfCart')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartItemController.prototype, "updateData", null);
__decorate([
    (0, common_1.Delete)(':userId/:productId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('productId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CartItemController.prototype, "removeCartItem", null);
CartItemController = __decorate([
    (0, common_1.Controller)('cart-item'),
    __metadata("design:paramtypes", [cart_item_service_1.CartItemService,
        cart_service_1.CartService,
        product_service_1.ProductService])
], CartItemController);
exports.CartItemController = CartItemController;
//# sourceMappingURL=cart-item.controller.js.map