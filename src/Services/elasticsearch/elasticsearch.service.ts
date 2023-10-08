import { Injectable } from '@nestjs/common';
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {Product} from "../../Modells/product.entity";

@Injectable()
export class ElasticsearchIndexingService {

    constructor(
        private elasticsearchService: ElasticsearchService
    ) {
    }

    async fetchAllProduct(data: any) {
        console.log('Fetched Data: ', data);
        const bulkBody = [];
        for (const item of data) {
            bulkBody.push({
                index: {
                    _index: 'product', // Replace with your Elasticsearch index name
                    _type: '_doc',
                    _id: item.id, // Assuming each item has an ID
                },
            });
            bulkBody.push(item.dataValues); // Include your data here
        }

        const bulkResponse = data.length>0 ? await this.elasticsearchService.bulk({ body: bulkBody }): 'No Product giving in Data Warehouse !';

        console.log('bulkResponse: ', bulkResponse);
    }

    async createProduct(product) {
        await this.elasticsearchService.index({
            index: 'product',
            body: product,
        })
    }

    async searchProducts(filter): Promise<Product[]> {
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
                                        gt: filter.price  // lt stands for "less than"
                                    }
                                }
                            } : null,
                            filter.maxPrice ? {
                                range: {
                                    price: {
                                        lt: filter.price  // lt stands for "less than"
                                    }
                                }
                            } : null
                        ].filter(Boolean) // Remove null values from the array
                    }
                }
            }
        });

        const hits = searchResponse.hits.hits;
        let arrays = hits.map(hit => hit._source as Product)
        arrays = arrays.filter(function(elem, index, self) {
            return index === self.indexOf(elem);
        })
        console.log('searchResponse.hits.hits: ', arrays);
        return arrays;
    }

    async searchProductsById(id: number): Promise<Product[]> {
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
        return hits.map((hit) => hit._source as Product);
    }

    async fetchProductInElasticsearch(product: Product){
        console.log('Fetched Data: ', product);
        const bulkBody = [];
        bulkBody.push({
            index: {
                _index: 'product', // Replace with your Elasticsearch index name
                _type: '_doc',
                _id: product.id, // Assuming each item has an ID
            },
        });
        bulkBody.push(product); // Include your data here
        const bulkResponse = product ? await this.elasticsearchService.bulk({ body: bulkBody }): 'No Product giving in Data Warehouse !';

        console.log('bulkResponse: ', bulkResponse);
    }

    async updateProductElasticSearch(productId: string, updatedProductData: any): Promise<Product> {
        try {
            const updateResponse = await this.elasticsearchService.update({
                index: 'product', // Replace with your Elasticsearch index name
                id: productId, // The ID of the product to update
                body: {
                    doc: updatedProductData,
                },
            });

            if (updateResponse .result === 'updated') {
                console.log(`Product with ID ${productId} has been updated.`);
                return updatedProductData
            } else {
                console.error(`Failed to update product with ID ${productId}.`);
            }
        } catch (error) {
            console.error(`Error updating product: ${error}`);
            throw error; // You can handle the error as needed
        }
    }

    async deleteProductElasticSearch(productId: string): Promise<string> {
        try {
            const deleteResponse  = await this.elasticsearchService.delete({
                index: 'product', // Replace with your Elasticsearch index name
                id: productId, // The ID of the product to delete
            });

            if (deleteResponse.result === 'deleted') {
                console.log(`Product with ID ${productId} has been deleted.`);
                return 'Product with ID ${productId} has been deleted.';
            } else {
                console.error(`Failed to delete product with ID ${productId}.`);
            }
        } catch (error) {
            console.error(`Error deleting product: ${error}`);
            throw error; // You can handle the error as needed
        }
    }
}
