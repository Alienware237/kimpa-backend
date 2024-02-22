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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const sequelize_1 = require("sequelize");
let ProductService = class ProductService {
    constructor(productRepository, elasticsearchService) {
        this.productRepository = productRepository;
        this.elasticsearchService = elasticsearchService;
    }
    async fetchAll() {
        const allProduct = await this.productRepository.findAll();
        await this.elasticsearchService.fetchAllProduct(allProduct);
    }
    async findAll() {
        return await this.productRepository.findAll();
    }
    async create(productDto) {
        console.log('Price of product: ', productDto.getPrice());
        const product = {
            name: productDto.getName(),
            description: productDto.getDescription(),
            price: productDto.getPrice(),
            numberInStock: productDto.getNumberInStock(),
            category: productDto.getCategory(),
            image: productDto.getImage()
        };
        return this.productRepository.create(product)
            .then(res => {
        });
    }
    async findAllByQuery(filter) {
        let where = {};
        const maxPrice = +filter.maxPrice;
        const minPrice = +filter.minPrice;
        console.log('filter for all: ', filter);
        if (filter.category) {
            console.log('filter for category !!');
            where['category'] = { [sequelize_1.Op.eq]: `${filter.category}` };
        }
        if (filter.description) {
            console.log('filter for description !!');
            if (Array.isArray(filter.description)) {
                let descriptionConditions;
                descriptionConditions = filter.description.map(description => ({
                    description: { [sequelize_1.Op.like]: `%${description}%` }
                }));
                where = {
                    [sequelize_1.Op.or]: descriptionConditions
                };
            }
            else {
                where['description'] = { [sequelize_1.Op.like]: `%${filter.description}%` };
            }
        }
        if (filter.minPrice && filter.maxPrice) {
            where['price'] = { [sequelize_1.Op.gte]: minPrice, [sequelize_1.Op.lte]: maxPrice };
        }
        else if (filter.minPrice) {
            console.log('filter for minPrice !!', minPrice);
            where['price'] = { [sequelize_1.Op.gte]: minPrice };
        }
        else if (filter.maxPrice) {
            console.log('filter for maxPrice !!', maxPrice);
            where['price'] = { [sequelize_1.Op.lte]: maxPrice };
        }
        console.log('where: ', where);
        const findOptions = {
            rejectOnEmpty: undefined,
            where,
        };
        return this.productRepository.findAll(findOptions);
    }
    update(productId, updateProductDto) {
        console.log('ProductId for product to update: ', productId);
        return this.productRepository.upsert(updateProductDto);
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
    async findById(id) {
        return await this.productRepository.findOne({ rejectOnEmpty: undefined, where: { id } });
    }
    async updateProductElasticSearch(productId, updatedProductData) {
        await this.elasticsearchService.updateProductElasticSearch(productId, updatedProductData);
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, elasticsearch_service_1.ElasticsearchIndexingService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map