/// <reference types="multer" />
import { ProductService } from "../../Services/product/product.service";
import { Product } from "../../Modells/product.entity";
import { UpdateProductDto } from "../../Modules/product/dto/update-product.dto";
import { CartService } from "../../Services/cart/cart.service";
import { CartItemService } from "../../Services/cart-item/cart-item.service";
import { UserService } from "../../Services/user/user.service";
import { Response } from "express";
import { BackblazeService } from "../../Services/Backblaze/backblaze.service";
export declare class ProductController {
    private readonly productService;
    private readonly cartService;
    private readonly cartItemService;
    private readonly userService;
    private readonly backblazeService;
    constructor(productService: ProductService, cartService: CartService, cartItemService: CartItemService, userService: UserService, backblazeService: BackblazeService);
    getAllProduct(): Promise<Product[]>;
    create(productDto: any, files: Array<Express.Multer.File>): Promise<void>;
    getImage(imageName: string, res: Response): void;
    findProductWithId(id: string): Promise<Product>;
    findProductWithUserId(userId: number): Promise<{
        user: import("../../Modells/user.entity").User;
        dataItemInCart: any[];
    }>;
    findOne(filter: any): Promise<Product[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<[Product, boolean]>;
    remove(id: string): string;
    updateProduct(id: string, updateProductDto: any): Promise<void>;
}
