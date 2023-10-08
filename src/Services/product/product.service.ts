import {Inject, Injectable} from "@nestjs/common";
import {ProductDto} from "../../Modules/product/dto/product.dto";
import {Product} from "../../Modells/product.entity";
import {PRODUCT_REPOSITORY} from "../../core/constants";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {ElasticsearchIndexingService} from "../elasticsearch/elasticsearch.service";

@Injectable()
export class ProductService {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private productRepository: typeof Product,
        private elasticsearchService: ElasticsearchIndexingService
    ) {
    }

    async fetchAll(){
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
        const allProduct = await this.productRepository.findAll<Product>();
        await this.elasticsearchService.fetchAllProduct(allProduct);
    }

    async findAll():Promise<Product[]> {
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
        //await this.elasticsearchService.createProduct(product);
        return this.productRepository.create(product)
            .then(res => {this.elasticsearchService.fetchProductInElasticsearch(res)})
    }


    async findAllByQuery(filter: any) {
        return await this.elasticsearchService.searchProducts(filter);
    }

    update(productId: number, updateProductDto: any) {
        return this.productRepository.upsert(updateProductDto);
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }

    async findById(id: number) {
        return await this.elasticsearchService.searchProductsById(id);
    }

    async updateProductElasticSearch(productId: string, updatedProductData: any){
        await this.elasticsearchService.updateProductElasticSearch(productId, updatedProductData);
    }

}