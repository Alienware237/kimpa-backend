"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./Modules/product/product.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./Modules/auth/auth.module");
const post_service_1 = require("./Services/post/post.service");
const post_controller_1 = require("./Controllers/post/post.controller");
const post_module_1 = require("./Modules/posts/post.module");
const auth_controller_1 = require("./Controllers/auth/auth.controller");
const product_controller_1 = require("./Controllers/product/product.controller");
const auth_service_1 = require("./Services/auth/auth.service");
const product_service_1 = require("./Services/product/product.service");
const administrator_service_1 = require("./Services/administrator/administrator.service");
const administrator_module_1 = require("./Modules/administrator/administrator.module");
const post_providers_1 = require("./Providers/post.providers");
const jwt_1 = require("@nestjs/jwt");
const product_providers_1 = require("./Providers/product.providers");
const administrator_providers_1 = require("./Providers/administrator.providers");
const cart_service_1 = require("./Services/cart/cart.service");
const cart_item_service_1 = require("./Services/cart-item/cart-item.service");
const comment_service_1 = require("./Services/comment/comment.service");
const order_service_1 = require("./Services/order/order.service");
const review_service_1 = require("./Services/review/review.service");
const user_service_1 = require("./Services/user/user.service");
const cart_providers_1 = require("./Providers/cart.providers");
const cart_item_providers_1 = require("./Providers/cart-item.providers");
const comment_providers_1 = require("./Providers/comment.providers");
const order_providers_1 = require("./Providers/order.providers");
const review_providers_1 = require("./Providers/review.providers");
const user_provider_1 = require("./Providers/user.provider");
const cart_module_1 = require("./Modules/cart/cart.module");
const cart_item_module_1 = require("./Modules/cart-item/cart-item.module");
const comment_module_1 = require("./Modules/comment/comment.module");
const order_module_1 = require("./Modules/order/order.module");
const review_module_1 = require("./Modules/review/review.module");
const user_module_1 = require("./Modules/user/user.module");
const cart_controller_1 = require("./Controllers/cart/cart.controller");
const cart_item_controller_1 = require("./Controllers/cart-iterm/cart-item.controller");
const comment_controller_1 = require("./Controllers/comment/comment.controller");
const order_controller_1 = require("./Controllers/order/order.controller");
const review_controller_1 = require("./Controllers/review/review.controller");
const user_controller_1 = require("./Controllers/user/user.controller");
const database_module_1 = require("./Database/database.module");
const database_providers_1 = require("./Database/database.providers");
const jwt_strategy_1 = require("./Modules/auth/jwt.strategy");
const administrator_controller_1 = require("./Controllers/administrator/administrator.controller");
const elasticsearch_module_1 = require("./Modules/elasticsearch/elasticsearch.module");
const elasticsearch_service_1 = require("./Services/elasticsearch/elasticsearch.service");
const order_item_module_1 = require("./Modules/order-item/order-item.module");
const order_item_controller_1 = require("./Controllers/order-item/order-item.controller");
const order_item_service_1 = require("./Services/order-item/order-item.service");
const order_item_providers_1 = require("./Providers/order-item.providers");
const backblaze_service_1 = require("./Services/Backblaze/backblaze.service");
const mail_controller_controller_1 = require("./Controllers/mail-controller/mail-controller.controller");
const mail_service_1 = require("./Services/mails/mail.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            post_module_1.PostsModule,
            administrator_module_1.AdministratorModule,
            product_module_1.ProductModule,
            cart_module_1.CartModule,
            cart_item_module_1.CartItemModule,
            comment_module_1.CommentModule,
            order_module_1.OrderModule,
            order_item_module_1.OrderItemModule,
            review_module_1.ReviewModule,
            user_module_1.UserModule,
            elasticsearch_module_1.ElasticsearchModule,
            jwt_1.JwtModule.register({
                secret: 'Kimpa-shopping',
                secretOrPrivateKey: 'Kimpa-shopping',
                signOptions: { expiresIn: '1h' },
            }),
            order_item_module_1.OrderItemModule,
        ],
        controllers: [app_controller_1.AppController,
            post_controller_1.PostController,
            auth_controller_1.AuthController,
            product_controller_1.ProductController,
            cart_controller_1.CartController,
            cart_item_controller_1.CartItemController,
            comment_controller_1.CommentController,
            order_controller_1.OrderController,
            order_item_controller_1.OrderItemController,
            review_controller_1.ReviewController,
            user_controller_1.UserController,
            administrator_controller_1.AdministratorController,
            mail_controller_controller_1.MailControllerController
        ],
        providers: [app_service_1.AppService,
            post_service_1.PostService,
            jwt_1.JwtService,
            auth_service_1.AuthService,
            product_service_1.ProductService,
            administrator_service_1.AdministratorService,
            cart_service_1.CartService,
            cart_item_service_1.CartItemService,
            comment_service_1.CommentService,
            order_service_1.OrderService,
            order_item_service_1.OrderItemService,
            review_service_1.ReviewService,
            user_service_1.UserService,
            jwt_strategy_1.JwtStrategy,
            elasticsearch_service_1.ElasticsearchIndexingService,
            backblaze_service_1.BackblazeService,
            mail_service_1.MailService,
            ...database_providers_1.databaseProviders,
            ...post_providers_1.postProviders,
            ...product_providers_1.productProviders,
            ...administrator_providers_1.administratorProviders,
            ...cart_providers_1.cartProviders,
            ...cart_item_providers_1.cartitemProviders,
            ...comment_providers_1.commentProviders,
            ...order_providers_1.orderProviders,
            ...review_providers_1.reviewProviders,
            ...user_provider_1.userProviders,
            ...order_item_providers_1.orderItemProviders
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map