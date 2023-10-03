import {Inject, Injectable} from '@nestjs/common';
import { CreateCartItemDto } from '../../Modules/cart-item/dto/create-cart-item.dto';
import { UpdateCartItemDto } from '../../Modules/cart-item/dto/update-cart-item.dto';
import {Cart} from "../../Modells/cart.entity";
import {CART_ITEM_REPOSITORY} from "../../core/constants";
import {CartItem} from "../../Modells/cart_item.entity";
import {literal, Op} from "sequelize";

@Injectable()
export class CartItemService {

  constructor(
      @Inject(CART_ITEM_REPOSITORY)
      private cartItemRepository: typeof CartItem
  ) {
  }


  async findAll(cartId: number): Promise<CartItem[]> {
    console.log('cart.id: ',cartId);
    return await this.cartItemRepository.findAll<CartItem>({where: {cartId}});
  }


  update(cartId: number, productId: number, createdAt: Date, newDetailsOfChoice: string) {
    const detailparsed = JSON.parse(newDetailsOfChoice);
    console.log('cartId: ', cartId);
    console.log('detailparsed.quantity: ', detailparsed.quantity);
    console.log('detailparsed.productId: ', productId);
    console.log('detailparsed.newDetailsOfChoice: ', newDetailsOfChoice);
    console.log('createdAt: ', createdAt);
    return this.cartItemRepository.update(
        { quantity: detailparsed.quantity,
          detailsOfChoice: newDetailsOfChoice,
          updatedAt: new Date()
        },
        {returning: undefined, where: { cartId, productId, createdAt } }
    );
  }


  async findOne(cartId: number, productId: number, productDetail: any) {
    const substring = `"selectedSize":"${productDetail.selectedSize}"`;
    console.log('substring: ', substring);
    return await this.cartItemRepository.findOne<CartItem>({
      rejectOnEmpty: undefined,
      where: {
        cartId,
        productId,
        detailsOfChoice: {
          [Op.like]: `%${substring}%`
        }
      }
    });
  }

  async remove(cartId: number, productId: number, detailsOfChoice: string) {
    const substring = `"selectedSize":"${JSON.parse(detailsOfChoice).selectedSize}"`;
    return await this.cartItemRepository.destroy<CartItem>({
      where: {productId,
        cartId,
        detailsOfChoice: {
          [Op.like]: `%${substring}%`
        }
      }});
  }

  create(cartId: number, productId, productDetail: any) {
    const detail = JSON.stringify({selectedSize: productDetail.selectedSize, quantity: productDetail.quantity});
    const cartItem = {
      cartId: cartId,
      productId: productId,
      quantity: productDetail.quantity,
      detailsOfChoice: detail
    }
    return this.cartItemRepository.create(cartItem);
  }
}
