import {Inject, Injectable} from "@nestjs/common";
import {ProductDto} from "../../Modules/product/dto/product.dto";
import {Product} from "../../Modells/product.entity";
import {PRODUCT_REPOSITORY} from "../../core/constants";
import {ElasticsearchService} from "@nestjs/elasticsearch";

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private productRepository: typeof Product,
        private elasticsearchService: ElasticsearchService
    ) {
    }

    async findAll(): Promise<Product[]> {
        /*
        AllProduct.forEach(el => {
            // Assuming "product.image" contains the image file name
            let images: string[] = [];
            if (/^[\],:{}\s]*$/.test(el.image.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                el.image = JSON.parse(el.image);
                if (Array.isArray(el.image)) {
                    el.image.forEach(img => {
                        const filePath = path.join(__dirname, '../../images', img);
                        // Ensure the directory exists
                        console.log('(fs.existsSync(filePath): ',fs.existsSync(filePath));
                        if (fs.existsSync(filePath)) {
                            console.log('fs.existsSync(directoryPath): ', true)
                            images.push(fs.readFileSync(filePath, 'utf8'))
                        }
                    })
                } else {
                    const filePath = path.join(__dirname, '../../images', el.image);
                    // Ensure the directory exists
                    if (fs.existsSync(filePath)) {
                        console.log('fs.existsSync(directoryPath): ', true)
                        images.push(fs.readFileSync(filePath, 'utf8'))
                    }
                }
                el.setDataValue('imageUrl', images);
            } else {
                const filePath = path.join(__dirname, '../../images', el.image);
                // Ensure the directory exists
                if (fs.existsSync(filePath)) {
                    console.log('fs.existsSync(directoryPath): ', true)
                    images.push(fs.readFileSync(filePath, 'utf8'))
                }
                el.setDataValue('imageUrl', images);
            }
        })
        */

        //await this.searchProducts('female')
        return await this.productRepository.findAll<Product>();
    }

    async create(productDto: ProductDto) {
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
        })
        return this.productRepository.create(product)
            .then(res => {this.fetchProductInElasticsearch(res)})
    }


    async findAllByQuery(filter: any) {
        return await this.searchProducts(filter);
    }

    update(productId: number, updateProductDto: any) {
        return this.productRepository.upsert(updateProductDto);
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }

    async findById(id: number) {
        return await this.searchProductsById(id);
    }



//  ========================== Elasticsearch ===================================

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