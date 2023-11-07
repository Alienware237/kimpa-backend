import { ElasticsearchService } from "@nestjs/elasticsearch";
import { Product } from "../../Modells/product.entity";
export declare class ElasticsearchIndexingService {
    private elasticsearchService;
    constructor(elasticsearchService: ElasticsearchService);
    fetchAllProduct(data: any): Promise<void>;
    createProduct(product: any): Promise<void>;
    searchProducts(filter: any): Promise<Product[]>;
    searchProductsById(id: number): Promise<Product[]>;
    fetchProductInElasticsearch(product: Product): Promise<void>;
    updateProductElasticSearch(productId: string, updatedProductData: any): Promise<Product>;
    deleteProductElasticSearch(productId: string): Promise<string>;
}
