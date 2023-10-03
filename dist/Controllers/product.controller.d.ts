import { ProductService } from "../Services/product.service";
import { Product } from "../Modells/product.entity";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProduct(): Promise<Product[]>;
}
