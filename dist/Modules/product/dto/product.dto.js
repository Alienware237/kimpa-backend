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
exports.ProductDto = void 0;
const class_validator_1 = require("class-validator");
class ProductDto {
    getName() {
        return this._name;
    }
    setName(name) {
        this._name = name;
    }
    getDescription() {
        return this._description;
    }
    setDescription(description) {
        this._description = description;
    }
    getPrice() {
        return this._price;
    }
    setPrice(price) {
        this._price = price;
    }
    getNumberInStock() {
        return this._numberInStock;
    }
    setNumberInStock(numberInStock) {
        this._numberInStock = numberInStock;
    }
    getCategory() {
        return this._category;
    }
    setCategory(category) {
        this._category = category;
    }
    getImage() {
        return this._image;
    }
    setImage(image) {
        this._image = image;
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDto.prototype, "_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDto.prototype, "_description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "_price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDto.prototype, "_category", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDto.prototype, "_image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDto.prototype, "_numberInStock", void 0);
exports.ProductDto = ProductDto;
//# sourceMappingURL=product.dto.js.map