"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../Services/auth/auth.service");
const auth_controller_1 = require("../../Controllers/auth/auth.controller");
const passport_1 = require("@nestjs/passport");
const administrator_module_1 = require("../administrator/administrator.module");
const local_strategy_1 = require("./local.strategy");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const administrator_service_1 = require("../../Services/administrator/administrator.service");
const administrator_providers_1 = require("../../Providers/administrator.providers");
const user_provider_1 = require("../../Providers/user.provider");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../../Services/user/user.service");
const cart_service_1 = require("../../Services/cart/cart.service");
const cart_providers_1 = require("../../Providers/cart.providers");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            administrator_module_1.AdministratorModule,
            user_module_1.UserModule,
            jwt_1.JwtModule.register({
                secret: 'Kimpa-shopping',
                secretOrPrivateKey: 'Kimpa-shopping',
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            administrator_service_1.AdministratorService,
            user_service_1.UserService,
            cart_service_1.CartService,
            administrator_module_1.AdministratorModule,
            ...administrator_providers_1.administratorProviders,
            ...user_provider_1.userProviders,
            ...cart_providers_1.cartProviders
        ],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map