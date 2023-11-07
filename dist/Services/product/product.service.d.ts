import { ProductDto } from "../../Modules/product/dto/product.dto";
import { Product } from "../../Modells/product.entity";
import { ElasticsearchIndexingService } from "../elasticsearch/elasticsearch.service";
export declare class ProductService {
    private productRepository;
    private elasticsearchService;
    constructor(productRepository: typeof Product, elasticsearchService: ElasticsearchIndexingService);
    fetchAll(): Promise<void>;
    findAll(): Promise<Product[]>;
    create(productDto: ProductDto): Promise<void>;
    findAllByQuery(filter: any): Promise<Product[]>;
    update(productId: number, updateProductDto: any): Promise<[Product, boolean]>;
    remove(id: number): string;
    findById(id: number): Promise<Product>;
    updateProductElasticSearch(productId: string, updatedProductData: any): Promise<void>;
}
