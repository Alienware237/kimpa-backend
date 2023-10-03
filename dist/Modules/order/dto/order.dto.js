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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../../Modells/user.entity");
class OrderDto {
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getOrderDate() {
        return this.orderDate;
    }
    setOrderDate(value) {
        this.orderDate = value;
    }
    getTotalAmount() {
        return this.totalAmount;
    }
    setTotalAmount(value) {
        this.totalAmount = value;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", user_entity_1.User)
], OrderDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], OrderDto.prototype, "orderDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], OrderDto.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], OrderDto.prototype, "orderItems", void 0);
exports.OrderDto = OrderDto;
//# sourceMappingURL=order.dto.js.map