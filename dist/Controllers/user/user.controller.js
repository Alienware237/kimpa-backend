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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../Services/user/user.service");
const update_user_dto_1 = require("../../Modules/user/dto/update-user.dto");
const user_dto_1 = require("../../Modules/user/dto/user.dto");
const cart_service_1 = require("../../Services/cart/cart.service");
const cart_item_service_1 = require("../../Services/cart-item/cart-item.service");
const product_service_1 = require("../../Services/product/product.service");
let UserController = class UserController {
    constructor(userService, cartService, cartItemsService, productService) {
        this.userService = userService;
        this.cartService = cartService;
        this.cartItemsService = cartItemsService;
        this.productService = productService;
    }
    getAllUser() {
        return this.userService.findAll();
    }
    create(userDto) {
        try {
            const userData = JSON.parse(userDto.User);
            const userDto_new = new user_dto_1.UserDto();
            if (userData.cookie) {
                userDto_new.setFirstName('');
                userDto_new.setLastName('');
                userDto_new.setEmail(userData.cookie + '@gmail.com');
                userDto_new.setPassword('');
                userDto_new.setSalutation(null);
                userDto_new.setStreet('');
                userDto_new.setHouseNumber(null);
                userDto_new.setZipCode('');
                userDto_new.setCity('');
                userDto_new.setCountry('');
                userDto_new.setPhone('');
                userDto_new.setRole(2);
                userDto_new.setCookies(userData.cookie);
            }
            else {
                userDto_new.setFirstName(userData.firstName);
                userDto_new.setLastName(userData.lastName);
                userDto_new.setEmail(userData.email);
                userDto_new.setPassword(userData.password);
                userDto_new.setSalutation(userData.salutation);
                userDto_new.setStreet(userData.street);
                userDto_new.setHouseNumber(userData.houseNumber);
                userDto_new.setZipCode(userData.zipCode);
                userDto_new.setCity(userData.city);
                userDto_new.setCountry(userData.country);
                userDto_new.setPhone(userData.phone);
                userDto_new.setRole(2);
                userDto_new.setCookies('');
            }
            console.log('HouseNumber: ', userDto.User);
            return this.userService.create(userDto_new);
        }
        catch (error) {
            console.error('Error creat user:', error);
            throw new common_1.InternalServerErrorException('Failed to creat user');
        }
    }
    async logIn(email, password, logInCookie) {
        try {
            const user = (await this.userService.find(email, password)).dataValues;
            const cart = await this.cartService.findOne(user.id);
            const itemInCarts = await this.cartItemsService.findAll(cart.id);
            await this.userService.putLogInCookie(user.id, logInCookie);
            const listOfArticle = [];
            const dataItemInCart = [];
            console.log('itemInCarts: ', itemInCarts);
            for (const itemC of itemInCarts) {
                const searchResult = await this.productService.findById(itemC.dataValues.productId);
                listOfArticle.push(searchResult[0]);
            }
            console.log('listOfArticle: ', listOfArticle);
            for (const itemC of itemInCarts) {
                const article = listOfArticle.find(article => article.id === itemC.dataValues.productId);
                if (article) {
                    article['numberOfArticle'] = itemC.quantity;
                    article['detailsOfChoice'] = itemC.detailsOfChoice;
                    dataItemInCart.push(article);
                }
            }
            const data = { user, 'data': dataItemInCart };
            console.log('user by logIn: ', data);
            return data;
        }
        catch (error) {
            console.error('Error finding user and cart:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }
    async getUserByCookie(cookie) {
        console.log('param1: ', cookie);
        try {
            let user = (await this.userService.findOneByCookie(cookie));
            user = user ? user.dataValues : null;
            console.log('/cookie/:cookie: ', user);
            const listOfArticle = [];
            const dataItemInCart = [];
            if (user) {
                const cart = await this.cartService.findOne(user.id);
                const itemInCarts = await this.cartItemsService.findAll(cart.id);
                console.log('itemInCarts: ', itemInCarts);
                for (const itemC of itemInCarts) {
                    const searchResult = await this.productService.findById(itemC.dataValues.productId);
                    console.log('searchResult.dataValues: ', searchResult.dataValues);
                    listOfArticle.push(searchResult.dataValues);
                }
                console.log('listOfArticle: ', listOfArticle);
                for (const itemC of itemInCarts) {
                    const article = listOfArticle.find(article => article.id === itemC.dataValues.productId);
                    if (article) {
                        article['numberOfArticle'] = itemC.quantity;
                        article['detailsOfChoice'] = itemC.detailsOfChoice;
                        dataItemInCart.push(article);
                    }
                }
            }
            const data = { user, 'data': dataItemInCart };
            console.log('user by getting cookie: ', data);
            return data;
        }
        catch (error) {
            console.error('Error finding user and cart by cookie:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }
    findOne(id) {
        return this.userService.findOne(+id);
    }
    update(id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.userService.remove(+id);
    }
    updateUser(userId, userDto) {
        console.log('userDto: ', userDto);
        return this.userService.update(userId, userDto);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/login/:email/:password/:logInCookie'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Param)('password')),
    __param(2, (0, common_1.Param)('logInCookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logIn", null);
__decorate([
    (0, common_1.Get)('/cookie/:cookie'),
    __param(0, (0, common_1.Param)('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserByCookie", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('update/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        cart_service_1.CartService,
        cart_item_service_1.CartItemService,
        product_service_1.ProductService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map