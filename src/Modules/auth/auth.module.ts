import { Module } from '@nestjs/common';
import { AuthService } from '../../Services/auth/auth.service';
import { AuthController } from '../../Controllers/auth/auth.controller';
import {PassportModule} from "@nestjs/passport";
import {AdministratorModule} from "../administrator/administrator.module";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {AdministratorService} from "../../Services/administrator/administrator.service";
import {administratorProviders} from "../../Providers/administrator.providers";
import {userProviders} from "../../Providers/user.provider";
import {UserModule} from "../user/user.module";
import {UserService} from "../../Services/user/user.service";
import * as dotenv from 'dotenv'
import {CartService} from "../../Services/cart/cart.service";
import {cartProviders} from "../../Providers/cart.providers";

@Module({
  imports: [
      PassportModule,
      AdministratorModule,
      UserModule,
      JwtModule.register({
          secret: 'Kimpa-shopping',
          secretOrPrivateKey: 'Kimpa-shopping',
          signOptions: { expiresIn: '1h' },
      }),
  ],
  providers: [
      AuthService,
      LocalStrategy,
      JwtStrategy,
      AdministratorService,
      UserService,
      CartService,
      AdministratorModule,
      ...administratorProviders,
      ...userProviders,
      ...cartProviders
  ],
  controllers: [AuthController],
})
export class AuthModule {}
