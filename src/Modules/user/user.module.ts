import { Module } from '@nestjs/common';
import { UserService } from '../../Services/user/user.service';
import { UserController } from '../../Controllers/user/user.controller';
import {userProviders} from "../../Providers/user.provider";
import {CartService} from "../../Services/cart/cart.service";
import {cartProviders} from "../../Providers/cart.providers";
import {cartitemProviders} from "../../Providers/cart-item.providers";
import {CartItemService} from "../../Services/cart-item/cart-item.service";
import {ProductService} from "../../Services/product/product.service";
import {productProviders} from "../../Providers/product.providers";
import {ElasticsearchModule} from "../elasticsearch/elasticsearch.module";
import {ElasticsearchIndexingService} from "../../Services/elasticsearch/elasticsearch.service";

@Module({
  imports: [ElasticsearchModule],
  controllers: [UserController],
  providers: [
    UserService,
    CartService,
    CartItemService,
    ProductService,
    ElasticsearchIndexingService,
    ...userProviders,
    ...cartProviders,
    ...cartitemProviders,
    ...productProviders,
  ]
})
export class UserModule {}
