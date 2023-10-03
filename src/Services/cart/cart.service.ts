import { Injectable, Inject } from "@nestjs/common";
import { CartDto } from "../../Modules/cart/dto/cart.dto";
import { Cart } from "../../Modells/cart.entity";
import {CART_REPOSITORY} from "../../core/constants";
import {CreateCartDto} from "../../Modules/cart/dto/create-cart.dto";
import {UpdateCartDto} from "../../Modules/cart/dto/update-cart.dto";

@Injectable()
export class CartService {
    constructor(
        @Inject(CART_REPOSITORY)
        private cartRepository: typeof Cart
    ) {
    }

    async findAll(): Promise<Cart[]> {
        return this.cartRepository.findAll<Cart>();
    }

    create(cartDto: CartDto) {
        return this.cartRepository.create(cartDto);
    }

    async findOne(userId: number): Promise<Cart> {
        return await this.cartRepository.findOne<Cart>({rejectOnEmpty: undefined, where: {userId}});
    }

    update(id: number, updateCartDto: UpdateCartDto) {
        return `This action updates a #${id} cart`;
    }

    remove(id: number) {
        return `This action removes a #${id} cart`;
    }
}