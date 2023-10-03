import { ProductService } from "../../product/product.service";
import { ElasticsearchService } from "@nestjs/elasticsearch";
export declare class ElasticsearchIndexingService {
    private productService;
    private elasticsearchService;
    constructor(productService: ProductService, elasticsearchService: ElasticsearchService);
    fetchAllProduct(): Promise<void>;
}
