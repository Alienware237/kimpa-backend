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
const elasticsearch_1 = require("@nestjs/elasticsearch");
let ProductService = class ProductService {
    constructor(productRepository, elasticsearchService) {
        this.productRepository = productRepository;
        this.elasticsearchService = elasticsearchService;
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
        await this.elasticsearchService.index({
            index: 'product',
            body: product,
        });
        return this.productRepository.create(product)
            .then(res => { this.fetchProductInElasticsearch(res); });
    }
    async findAllByQuery(filter) {
        return await this.searchProducts(filter);
    }
    update(productId, updateProductDto) {
        return this.productRepository.upsert(updateProductDto);
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
    async findById(id) {
        return await this.searchProductsById(id);
    }
    async searchProducts(filter) {
        const searchResponse = await this.elasticsearchService.search({
            index: 'product',
            body: {
                query: {
                    bool: {
                        must: [
                            filter.category ? { match: { category: filter.category } } : null,
                            filter.description ? { match: { description: filter.description } } : null,
                            filter.minPrice ? {
                                range: {
                                    price: {
                                        gt: filter.price
                                    }
                                }
                            } : null,
                            filter.maxPrice ? {
                                range: {
                                    price: {
                                        lt: filter.price
                                    }
                                }
                            } : null
                        ].filter(Boolean)
                    }
                }
            }
        });
        const hits = searchResponse.hits.hits;
        let arrays = hits.map(hit => hit._source);
        arrays = arrays.filter(function (elem, index, self) {
            return index === self.indexOf(elem);
        });
        console.log('searchResponse.hits.hits: ', arrays);
        return arrays;
    }
    async searchProductsById(id) {
        console.log('searchProductsById: ', id);
        const searchResponse = await this.elasticsearchService.search({
            index: 'product',
            body: {
                query: {
                    bool: {
                        should: [{ match: { id: id } }],
                    },
                },
            },
        });
        const hits = searchResponse.hits.hits;
        return hits.map((hit) => hit._source);
    }
    async fetchProductInElasticsearch(product) {
        console.log('Fetched Data: ', product);
        const bulkBody = [];
        bulkBody.push({
            index: {
                _index: 'product',
                _type: '_doc',
                _id: product.id,
            },
        });
        bulkBody.push(product);
        const bulkResponse = product ? await this.elasticsearchService.bulk({ body: bulkBody }) : 'No Product giving in Data Warehouse !';
        console.log('bulkResponse: ', bulkResponse);
    }
    async updateProductElasticSearch(productId, updatedProductData) {
        try {
            const updateResponse = await this.elasticsearchService.update({
                index: 'product',
                id: productId,
                body: {
                    doc: updatedProductData,
                },
            });
            if (updateResponse.result === 'updated') {
                console.log(`Product with ID ${productId} has been updated.`);
                return updatedProductData;
            }
            else {
                console.error(`Failed to update product with ID ${productId}.`);
            }
        }
        catch (error) {
            console.error(`Error updating product: ${error}`);
            throw error;
        }
    }
    async deleteProductElasticSearch(productId) {
        try {
            const deleteResponse = await this.elasticsearchService.delete({
                index: 'product',
                id: productId,
            });
            if (deleteResponse.result === 'deleted') {
                console.log(`Product with ID ${productId} has been deleted.`);
                return 'Product with ID ${productId} has been deleted.';
            }
            else {
                console.error(`Failed to delete product with ID ${productId}.`);
            }
        }
        catch (error) {
            console.error(`Error deleting product: ${error}`);
            throw error;
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PRODUCT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, elasticsearch_1.ElasticsearchService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map