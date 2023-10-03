import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Put,
  Query, Request
} from '@nestjs/common';
import { CartItemService } from '../../Services/cart-item/cart-item.service';
import { CreateCartItemDto } from '../../Modules/cart-item/dto/create-cart-item.dto';
import { UpdateCartItemDto } from '../../Modules/cart-item/dto/update-cart-item.dto';
import {CartService} from "../../Services/cart/cart.service";
import {UserService} from "../../Services/user/user.service";
import {ProductService} from "../../Services/product/product.service";
import {Session} from "express-session";

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService,
              private readonly cartService: CartService,
              private readonly productService: ProductService
  ) {}

  @Get('/:userId')
  async findAllItem(@Param('userId') userId: number) {
    console.log('param1: ', userId);
    try {
      const cart = await this.cartService.findOne(userId);
      console.log('cart.id: ', cart);
      const itemInCarts = await this.cartItemService.findAll(cart.id);

      const listOfArticle = [];
      const dataItemInCart = [];

      let index = 0;
      for (const itemC of itemInCarts) {
        let article = (await this.productService.findById(itemC.dataValues.productId))[0];
        console.log('itemC.details' + 'OfChoice ' + index, ': ', itemC.detailsOfChoice);
        console.log('article In Item ' + index + ' befor: ', article);
        if (article) {
          article['insertedAt'] = itemC.createdAt;
          article['numberOfArticle'] = itemC.quantity;
          article['detailsOfChoice'] = itemC.detailsOfChoice;
          console.log('article In Item ' + index + ' After: ', article);
          ++index;
          dataItemInCart.push(article);
        }
      }
      return {dataItemInCart, cartId: cart.id};
    } catch (error) {
      console.error('Error finding user and cart:', error);
      throw new InternalServerErrorException('Failed to retrieve user and cart data');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    //return this.cartItemService.update(+id, updateCartItemDto);
  }

  @Put('/:userId/:productId')
  async InsertOne(@Param('userId') userId: number,
                  @Param('productId') productId: number,
                  @Body() productDetail: any) {
    console.log('productDetail: ', productDetail);
    const cart = await this.cartService.findOne(userId);
    console.log('cart.id: ', cart.id);
    const cartItemExist = await this.cartItemService.findOne(cart.id, productId, productDetail);
    console.log('cartItemExist: ', cartItemExist);
    if (cartItemExist) {
      return this.cartItemService.update(cart.id, productId,  cartItemExist.dataValues.createdAt, JSON.stringify(productDetail))
    }
    return this.cartItemService.create(cart.id, productId, productDetail)
  }

  @Put(':idOfCart') // Define the route for updating data with a parameter
  async updateData(@Param('idOfCart') idOfCart: number, @Body() updatedData: any) {
    console.log('updatedData: ', updatedData);

    for (const article of updatedData) {
      //const cartItemExist = await this.cartItemService.findOne(idOfCart, article.id, article.createdAt);
      await this.cartItemService.update(idOfCart, article.id, article.insertedAt, JSON.stringify({selectedSize: article.detailsOfChoice.selectedSize, quantity:  article.numberOfArticle}))}
  }

  @Delete(':userId/:productId')
  async removeCartItem(
      @Param('userId',) userId: number,
      @Param('productId',) productId: number,
      @Body() detailsOfChoice: any) {
    console.log('detailsOfChoice: ', detailsOfChoice);
    const cartId = (await this.cartService.findOne(userId)).dataValues.id;
    return this.cartItemService.remove(cartId, productId, JSON.stringify(detailsOfChoice));
  }


}
