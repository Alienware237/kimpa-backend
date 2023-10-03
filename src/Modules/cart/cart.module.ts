import { Module } from '@nestjs/common';
import { CartService } from '../../Services/cart/cart.service';
import { CartController } from '../../Controllers/cart/cart.controller';
import {cartProviders} from "../../Providers/cart.providers";

@Module({
  controllers: [CartController],
  providers: [CartService, ...cartProviders]
})
export class CartModule {}
