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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
const cart_service_1 = require("../cart/cart.service");
const cart_dto_1 = require("../../Modules/cart/dto/cart.dto");
let UserService = class UserService {
    constructor(userRepository, cartService) {
        this.userRepository = userRepository;
        this.cartService = cartService;
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        console.log('Update user because of checkout with id: ', id);
        return this.userRepository.update({
            firstName: updateUserDto.firstName,
            lastName: updateUserDto.lastName,
            email: updateUserDto.email,
            password: updateUserDto.password,
            salutation: updateUserDto.salutation,
            street: updateUserDto.street,
            houseNumber: updateUserDto.houseNumber,
            zipCode: updateUserDto.zipCode,
            city: updateUserDto.city,
            country: updateUserDto.country,
            phone: updateUserDto.phone,
            role: 2,
            cookies: updateUserDto.cookies
        }, { returning: undefined, where: { id } });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async create(user) {
        console.log('This action adds a new user');
        const user_new = {
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            password: user.getPassword(),
            salutation: user.getSalutation(),
            street: user.getStreet(),
            houseNumber: user.getHouseNumber(),
            zipCode: user.getZipCode(),
            city: user.getCity(),
            country: user.getCountry(),
            phone: user.getPhone(),
            role: 2,
            cookies: user.getCookies()
        };
        const user_from_db = await this.userRepository.create(user_new);
        console.log('response: ', user_from_db.id);
        const cartDto = new cart_dto_1.CartDto();
        cartDto.setUserId(user_from_db.id);
        const cart = this.cartService.create(cartDto);
        return { 'user': user_from_db, 'cart': cart };
    }
    async findOneByEmail(email) {
        return await this.userRepository.findOne({ rejectOnEmpty: undefined, where: { email } });
    }
    async findOneById(id) {
        return await this.userRepository.findOne({ rejectOnEmpty: undefined, where: { id } });
    }
    async findOneBylastName(lastName) {
        return await this.userRepository.findOne({ rejectOnEmpty: undefined, where: { lastName } });
    }
    async findOneByPassword(password) {
        return await this.userRepository.findOne({ rejectOnEmpty: undefined, where: { password } });
    }
    async find(email, password) {
        return await this.userRepository.findOne({ rejectOnEmpty: undefined, where: { email, password } });
    }
    async putLogInCookie(id, logInCookie) {
        return this.userRepository.update({
            cookies: logInCookie
        }, {
            returning: undefined,
            where: { id }
        });
    }
    async findOneByCookie(cookies) {
        return await this.userRepository.findOne({ rejectOnEmpty: undefined, where: { cookies } });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object, cart_service_1.CartService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map