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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const order_item_entity_1 = require("./order_item.entity");
const review_entity_1 = require("./review.entity");
const comment_entity_1 = require("./comment.entity");
const cart_item_entity_1 = require("./cart_item.entity");
let Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL(10, 2)),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Product.prototype, "numberInStock", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT("long")),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_item_entity_1.OrderItem),
    __metadata("design:type", Array)
], Product.prototype, "orderItems", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => review_entity_1.Review, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => comment_entity_1.Comment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
    }),
    __metadata("design:type", Array)
], Product.prototype, "comments", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_item_entity_1.CartItem),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'products' })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map