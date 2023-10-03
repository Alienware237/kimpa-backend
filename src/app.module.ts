import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProductModule} from "./Modules/product/product.module";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './Modules/auth/auth.module';
import { PostService } from './Services/post/post.service';
import { PostController } from './Controllers/post/post.controller';
import { PostsModule } from './Modules/posts/post.module';
import {AuthController} from "./Controllers/auth/auth.controller";
import {ProductController} from "./Controllers/product/product.controller";
import {AuthService} from "./Services/auth/auth.service";
import {ProductService} from "./Services/product/product.service";
import {AdministratorService} from "./Services/administrator/administrator.service";
import {AdministratorModule} from "./Modules/administrator/administrator.module";
import {postProviders} from "./Providers/post.providers";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {productProviders} from "./Providers/product.providers";
import {administratorProviders} from "./Providers/administrator.providers";
import {CartService} from "./Services/cart/cart.service";
import {CartItemService} from "./Services/cart-item/cart-item.service";
import {CommentService} from "./Services/comment/comment.service";
import {OrderService} from "./Services/order/order.service";
import {ReviewService} from "./Services/review/review.service";
import {UserService} from "./Services/user/user.service";
import {cartProviders} from "./Providers/cart.providers";
import {cartitemProviders} from "./Providers/cart-item.providers";
import {commentProviders} from "./Providers/comment.providers";
import {orderProviders} from "./Providers/order.providers";
import {reviewProviders} from "./Providers/review.providers";
import {userProviders} from "./Providers/user.provider";
import {CartModule} from "./Modules/cart/cart.module";
import {CartItemModule} from "./Modules/cart-item/cart-item.module";
import {CommentModule} from "./Modules/comment/comment.module";
import {OrderModule} from "./Modules/order/order.module";
import {ReviewModule} from "./Modules/review/review.module";
import {UserModule} from "./Modules/user/user.module";
import {CartController} from "./Controllers/cart/cart.controller";
import {CartItemController} from "./Controllers/cart-iterm/cart-item.controller";
import {CommentController} from "./Controllers/comment/comment.controller";
import {OrderController} from "./Controllers/order/order.controller";
import {ReviewController} from "./Controllers/review/review.controller";
import {UserController} from "./Controllers/user/user.controller";
import {DatabaseModule} from "./Database/database.module";
import {databaseProviders} from "./Database/database.providers";
import {JwtStrategy} from "./Modules/auth/jwt.strategy";
import {AdministratorController} from "./Controllers/administrator/administrator.controller";
import {ElasticsearchModule} from "./Modules/elasticsearch/elasticsearch.module";
import { ElasticsearchIndexingService } from './Services/elasticsearch/elasticsearch.service';
import { OrderItemModule } from './Modules/order-item/order-item.module';
import {OrderItemController} from "./Controllers/order-item/order-item.controller";
import {OrderItemService} from "./Services/order-item/order-item.service";
import {orderItemProviders} from "./Providers/order-item.providers";

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal: true}),
      DatabaseModule,
      AuthModule,
      PostsModule,
      AdministratorModule,
      ProductModule,
      CartModule,
      CartItemModule,
      CommentModule,
      OrderModule,
      OrderItemModule,
      ReviewModule,
      UserModule,
      ElasticsearchModule,
      JwtModule.register({
          secret: 'Kimpa-shopping',
          secretOrPrivateKey: 'Kimpa-shopping',
          signOptions: { expiresIn: '1h' },
      }),
      OrderItemModule,

  ],
  controllers: [AppController,
      PostController,
      AuthController,
      ProductController,
      CartController,
      CartItemController,
      CommentController,
      OrderController,
      OrderItemController,
      ReviewController,
      UserController,
      AdministratorController
  ],
  providers: [AppService,
      PostService,
      JwtService,
      AuthService,
      ProductService,
      AdministratorService,
      CartService,
      CartItemService,
      CommentService,
      OrderService,
      OrderItemService,
      ReviewService,
      UserService,
      JwtStrategy,
      ElasticsearchIndexingService,
      ...databaseProviders,
      ...postProviders,
      ...productProviders,
      ...administratorProviders,
      ...cartProviders,
      ...cartitemProviders,
      ...commentProviders,
      ...orderProviders,
      ...reviewProviders,
      ...userProviders,
      ...orderItemProviders

  ],
})
export class AppModule {}
