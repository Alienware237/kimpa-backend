import { Module } from '@nestjs/common';
import { CartItemService } from '../../Services/cart-item/cart-item.service';
import { CartItemController } from '../../Controllers/cart-iterm/cart-item.controller';
import {cartitemProviders} from "../../Providers/cart-item.providers";
import {CartService} from "../../Services/cart/cart.service";
import {cartProviders} from "../../Providers/cart.providers";
import {ProductService} from "../../Services/product/product.service";
import {productProviders} from "../../Providers/product.providers";
import {ElasticsearchModule} from "../elasticsearch/elasticsearch.module";
import {ElasticsearchIndexingService} from "../../Services/elasticsearch/elasticsearch.service";

@Module({
    imports: [ElasticsearchModule],
  controllers: [CartItemController],
  providers: [
      CartItemService,
      CartService,
      ProductService,
      ElasticsearchIndexingService,
      ...cartitemProviders,
      ...cartProviders,
      ...productProviders
  ]
})
export class CartItemModule {}
