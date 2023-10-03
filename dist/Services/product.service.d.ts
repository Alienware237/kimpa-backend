import { Product } from "../Modells/product.entity";
export declare class ProductService {
    private productRepository;
    constructor(productRepository: typeof Product);
    findAll(): Promise<Product[]>;
}
