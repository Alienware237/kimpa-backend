import { ProductDto } from "../../Modules/product/dto/product.dto";
import { Product } from "../../Modells/product.entity";
import { ElasticsearchService } from "@nestjs/elasticsearch";
export declare class ProductService {
    private productRepository;
    private elasticsearchService;
    constructor(productRepository: typeof Product, elasticsearchService: ElasticsearchService);
    findAll(): Promise<Product[]>;
    create(productDto: ProductDto): Promise<void>;
    findAllByQuery(filter: any): Promise<Product[]>;
    update(productId: number, updateProductDto: any): Promise<[Product, boolean]>;
    remove(id: number): string;
    findById(id: number): Promise<Product[]>;
    searchProducts(filter: any): Promise<Product[]>;
    searchProductsById(id: number): Promise<Product[]>;
    fetchProductInElasticsearch(product: Product): Promise<void>;
    updateProductElasticSearch(productId: string, updatedProductData: any): Promise<Product>;
    deleteProductElasticSearch(productId: string): Promise<string>;
}
