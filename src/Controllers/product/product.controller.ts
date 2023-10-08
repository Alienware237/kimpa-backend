import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Patch,
    Post,
    Put,
    Req,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {ProductService} from "../../Services/product/product.service";
import {Product} from "../../Modells/product.entity";
import {UpdateProductDto} from "../../Modules/product/dto/update-product.dto";
import {ProductDto} from "../../Modules/product/dto/product.dto";
import {EnableToInsertArticleGuardService} from "../../core/Guards/enable-to-insert-article-guard.service";
import * as fs from "fs";
import * as path from "path";
import {CartService} from "../../Services/cart/cart.service";
import {CartItemService} from "../../Services/cart-item/cart-item.service";
import {UserService} from "../../Services/user/user.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Express, Response} from "express";
import {diskStorage} from "multer"; // Use the promises version of fs

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService,
                private readonly cartService: CartService,
                private readonly cartItemService: CartItemService,
                private readonly userService: UserService
                ) {
    }

    @Get('list')
    getAllProduct(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @UseGuards(EnableToInsertArticleGuardService)
    @Post('insert')
    @UseInterceptors(FilesInterceptor('files', 3,{
        storage: diskStorage({
            destination : (req, image, cb) => {
                cb(null, path.join(__dirname, '../../images'));
            },
            filename: (req, image, cb) => {
                console.log('Uploaded Image: ', image);
                cb(null, `${Date.now()}${image.originalname}`);
            },
        })
    })) // Use 'files' instead of 'file'
    async create(@Body('productDto') productDto: any,
           @UploadedFiles() files: Array<Express.Multer.File>
           ) {
        try {

            // Ensure the directory exists
            const directoryPath = path.join(__dirname, '../../images');
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }
            console.log('Directory Exist: ', fs.existsSync(directoryPath));

            // Handle uploaded files
            console.log('Uploaded Files:', files);
            let image: string[] = [];
            files.forEach(fi =>{ image.push(fi.filename) })

            console.log('Uploaded files name: ', image);

            productDto = JSON.parse(productDto)

            // Handle JSON payload (productDto)
            console.log('Product DTO:', productDto);

            //console.log('product: ', productDto);

            if (productDto.id) { //Product exist because he has id. So let us Update ihr images
                console.log('productDto for test of update: ', productDto);
                productDto.image = JSON.stringify(image)

                return this.productService.update(productDto.id, productDto)
                    .then( res =>{
                        /*
                        this.productService.updateProductElasticSearch(productDto.id, productDto)
                            .then(res => {
                                return res
                            })*/
                    });
            }else {
                const productDtoNew = new ProductDto();
                productDtoNew.setName(productDto.name);
                productDtoNew.setDescription(productDto.description);
                productDtoNew.setPrice(productDto.price);
                productDtoNew.setNumberInStock(productDto.numberInStock);
                productDtoNew.setCategory(productDto.category);
                productDtoNew.setImage(JSON.stringify(image));
                return this.productService.create(productDtoNew);
            }

        } catch (error) {
            console.error('Error creating product:', error);
            throw new InternalServerErrorException('Failed to create product');
        }
    }

    @Get('img/:imageName')
    getImage(@Param('imageName') imageName: string, @Res() res: Response) {
        console.log('getImage was called: ', imageName);
        const imagePath = path.join(__dirname, '../../images', imageName);
        return res.sendFile(imagePath);
    }

    @Get(':id')
    findProductWithId(@Param('id') id: string) {
        return this.productService.findById(+id);
    }

    @Get('user/:userId')
    async findProductWithUserId(@Param('userId') userId: number) {

        try {
            const listOfArticle = [];
            const dataItemInCart = [];
            const user = await this.userService.findOneById(userId);
            const cart = await this.cartService.findOne(userId);
            console.log('cart by checkout: ', cart);
            const itemInCarts = await this.cartItemService.findAll(cart.id);
            for (const itemC of itemInCarts) {
                const searchResult = await this.productService.findById(itemC.dataValues.productId);
                listOfArticle.push(searchResult[0]);
            }

            console.log('listOfArticle: ', listOfArticle);

            for (const itemC of itemInCarts) {
                const article = listOfArticle.find(article => article.id === itemC.dataValues.productId);
                if (article) {
                    article['numberOfArticle'] = itemC.quantity;
                    article['detailsOfChoice'] = itemC.detailsOfChoice;
                    dataItemInCart.push(article);
                }
            }
            console.log('user by getting cookie: ', dataItemInCart);
            return {user, dataItemInCart};
        } catch (error) {
            console.error('Error finding user and cart by cookie:', error);
            throw new InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }


    @Post('filter')
    findOne(@Body() filter: any) {
        console.log('parameter1: ', filter);
        return this.productService.findAllByQuery(filter);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }

    @Put('update/:productId')
    updateProduct(@Param('productId') id: string, @Body() updateProductDto: any) {
        console.log('Calling update product !!!');
        return this.productService.update(+id, updateProductDto)
            .then( res =>{
                /*
                this.productService.updateProductElasticSearch(id, updateProductDto)
                    .then(res => {
                        return res
                    })*/
            });
    }


}