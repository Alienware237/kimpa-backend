import { Module } from '@nestjs/common';
import { ProductService } from '../../Services/product/product.service';
import { ProductController } from '../../Controllers/product/product.controller';
import {productProviders} from "../../Providers/product.providers";
import {JwtStrategy} from "../auth/jwt.strategy";
import {AdministratorService} from "../../Services/administrator/administrator.service";
import {AuthService} from "../../Services/auth/auth.service";
import {administratorProviders} from "../../Providers/administrator.providers";
import {UserService} from "../../Services/user/user.service";
import {JwtService} from "@nestjs/jwt";
import {userProviders} from "../../Providers/user.provider";
import {CartService} from "../../Services/cart/cart.service";
import {cartProviders} from "../../Providers/cart.providers";
import {ElasticsearchModule} from "../elasticsearch/elasticsearch.module";
import {cartitemProviders} from "../../Providers/cart-item.providers";
import {CartItemService} from "../../Services/cart-item/cart-item.service";
import {ElasticsearchIndexingService} from "../../Services/elasticsearch/elasticsearch.service";
import {BackblazeService} from "../../Services/Backblaze/backblaze.service";

@Module({
  imports: [ElasticsearchModule],
  controllers: [ProductController],
  providers: [ProductService,
    JwtStrategy,
    AdministratorService,
    AuthService,
    UserService,
    CartService,
    CartItemService,
    JwtService,
    ElasticsearchIndexingService,
    BackblazeService,
    ...productProviders,
    ...administratorProviders,
    ...userProviders,
    ...cartProviders,
    ...cartitemProviders
  ]
})
export class ProductModule {}
