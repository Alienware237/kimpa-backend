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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../../Services/product/product.service");
const update_product_dto_1 = require("../../Modules/product/dto/update-product.dto");
const product_dto_1 = require("../../Modules/product/dto/product.dto");
const enable_to_insert_article_guard_service_1 = require("../../core/Guards/enable-to-insert-article-guard.service");
const fs = require("fs");
const path = require("path");
const cart_service_1 = require("../../Services/cart/cart.service");
const cart_item_service_1 = require("../../Services/cart-item/cart-item.service");
const user_service_1 = require("../../Services/user/user.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const backblaze_service_1 = require("../../Services/Backblaze/backblaze.service");
let ProductController = class ProductController {
    constructor(productService, cartService, cartItemService, userService, backblazeService) {
        this.productService = productService;
        this.cartService = cartService;
        this.cartItemService = cartItemService;
        this.userService = userService;
        this.backblazeService = backblazeService;
    }
    getAllProduct() {
        return this.productService.findAll();
    }
    async create(productDto, files) {
        try {
            const directoryPath = path.join(__dirname, '../../images');
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }
            console.log('Directory Exist: ', fs.existsSync(directoryPath));
            console.log('Uploaded Files:', files);
            const imageUrls = await this.backblazeService.uploadFile('app-stored-image', files);
            console.log('Uploaded files name: ', imageUrls);
            productDto = JSON.parse(productDto);
            console.log('Product DTO:', productDto);
            if (productDto.id) {
                console.log('productDto for test of update: ', productDto);
                productDto.image = JSON.stringify(imageUrls);
                return this.productService.update(productDto.id, productDto)
                    .then(res => {
                });
            }
            else {
                const productDtoNew = new product_dto_1.ProductDto();
                productDtoNew.setName(productDto.name);
                productDtoNew.setDescription(productDto.description);
                productDtoNew.setPrice(productDto.price);
                productDtoNew.setNumberInStock(productDto.numberInStock);
                productDtoNew.setCategory(productDto.category);
                productDtoNew.setImage(JSON.stringify(imageUrls));
                return this.productService.create(productDtoNew);
            }
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw new common_1.InternalServerErrorException('Failed to create product');
        }
    }
    getImage(imageName, res) {
        console.log('getImage was called: ', imageName);
        const imagePath = path.join(__dirname, '../../images', imageName);
        return res.sendFile(imagePath);
    }
    findProductWithId(id) {
        return this.productService.findById(+id);
    }
    async findProductWithUserId(userId) {
        const dataItemInCart = [];
        let user;
        try {
            user = await this.userService.findOneById(userId);
            const cart = await this.cartService.findOne(userId);
            console.log('cart by checkout: ', cart);
            await this.cartItemService.findAll(cart.id).then(async (itemInCarts) => {
                for (const itemC of itemInCarts) {
                    await this.productService.findById(itemC.dataValues.productId).then(searchResult => {
                        let article = searchResult.dataValues;
                        article['numberOfArticle'] = itemC.quantity;
                        article['detailsOfChoice'] = itemC.detailsOfChoice;
                        console.log('searchResult: ', article);
                        dataItemInCart.push(article);
                    });
                }
            });
            console.log('user by getting cookie: ', dataItemInCart);
            return { user, dataItemInCart };
        }
        catch (error) {
            console.error('Error finding user and cart by cookie:', error);
            throw new common_1.InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }
    findOne(filter) {
        console.log('parameter1: ', filter);
        return this.productService.findAllByQuery(filter);
    }
    update(id, updateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }
    remove(id) {
        return this.productService.remove(+id);
    }
    updateProduct(id, updateProductDto) {
        console.log('Calling update product !!!');
        return this.productService.update(+id, updateProductDto)
            .then(res => {
        });
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.UseGuards)(enable_to_insert_article_guard_service_1.EnableToInsertArticleGuardService),
    (0, common_1.Post)('insert'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 3, {
        storage: (0, multer_1.diskStorage)({
            destination: (req, image, cb) => {
                cb(null, path.join(__dirname, '../../images'));
            },
            filename: (req, image, cb) => {
                console.log('Uploaded Image: ', image);
                cb(null, `${Date.now()}${image.originalname}`);
            },
        })
    })),
    __param(0, (0, common_1.Body)('productDto')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('img/:imageName'),
    __param(0, (0, common_1.Param)('imageName')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getImage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findProductWithId", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findProductWithUserId", null);
__decorate([
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('update/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        cart_service_1.CartService,
        cart_item_service_1.CartItemService,
        user_service_1.UserService,
        backblaze_service_1.BackblazeService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map