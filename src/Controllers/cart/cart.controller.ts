import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {CartService} from "../../Services/cart/cart.service";
import {Cart} from "../../Modells/cart.entity";
import {CreateCartDto} from "../../Modules/cart/dto/create-cart.dto";
import {UpdateCartDto} from "../../Modules/cart/dto/update-cart.dto";
import {CartDto} from "../../Modules/cart/dto/cart.dto";


@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {
    }

    @Get('list')
    getAllProduct(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    @Post()
    create(@Body() cartDto: CartDto) {
        return this.cartService.create(cartDto);
    }

    @Get()
    findAll() {
        return this.cartService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.cartService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
        return this.cartService.update(+id, updateCartDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cartService.remove(+id);
    }
}