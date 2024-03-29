import {Inject, Injectable} from "@nestjs/common";
import {ProductDto} from "../../Modules/product/dto/product.dto";
import {Product} from "../../Modells/product.entity";
import {PRODUCT_REPOSITORY} from "../../core/constants";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {ElasticsearchIndexingService} from "../elasticsearch/elasticsearch.service";
import {CartItem} from "../../Modells/cart_item.entity";
import {Op} from "sequelize";

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
            .then(res => {//this.elasticsearchService.fetchProductInElasticsearch(res)
                 })
    }


    async findAllByQuery(filter: any) {
        let where = {};
        const maxPrice = +filter.maxPrice;
        const minPrice = +filter.minPrice;

        console.log('filter for all: ', filter);
        if (filter.category) {
            console.log('filter for category !!');
            where['category'] = { [Op.eq]: `${filter.category}` };
        }

        if (filter.description) {
            console.log('filter for description !!');
            if (Array.isArray(filter.description)) {
                // Assuming filter.descriptions is an array of strings
                let descriptionConditions;
                descriptionConditions = filter.description.map(description => ({
                    description: { [Op.like]: `%${description}%` }
                }));
                where = {
                    [Op.or]: descriptionConditions
                };
            }else {
                where['description'] = { [Op.like]: `%${filter.description}%` };
            }
        }

        if (filter.minPrice && filter.maxPrice) {
            where['price'] = { [Op.gte]: minPrice, [Op.lte]: maxPrice };
        } else if (filter.minPrice) {
            console.log('filter for minPrice !!', minPrice);
            where['price'] = { [Op.gte]: minPrice };
        }else if (filter.maxPrice) {
            console.log('filter for maxPrice !!', maxPrice);
            where['price'] = { [Op.lte]: maxPrice };
        }

        console.log('where: ', where);

        const findOptions = {
            rejectOnEmpty: undefined,
            where,
        };

        return this.productRepository.findAll<Product>(findOptions);
    }

    update(productId: number, updateProductDto: any) {
        console.log('ProductId for product to update: ', productId)
        return this.productRepository.upsert(updateProductDto);
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }

    async findById(id: number) {
        return await this.productRepository.findOne<Product>({rejectOnEmpty: undefined, where: { id }});
    }

    async updateProductElasticSearch(productId: string, updatedProductData: any){
        await this.elasticsearchService.updateProductElasticSearch(productId, updatedProductData);
    }

}