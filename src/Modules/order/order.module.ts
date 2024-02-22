import { Module } from '@nestjs/common';
import { OrderService } from '../../Services/order/order.service';
import { OrderController } from '../../Controllers/order/order.controller';
import {orderProviders} from "../../Providers/order.providers";
import {UserService} from "../../Services/user/user.service";
import {userProviders} from "../../Providers/user.provider";
import {cartProviders} from "../../Providers/cart.providers";
import {CartService} from "../../Services/cart/cart.service";
import {OrderItemService} from "../../Services/order-item/order-item.service";
import {orderItemProviders} from "../../Providers/order-item.providers";
import {MailService} from "../../Services/mails/mail.service";

@Module({
  controllers: [OrderController],
  providers: [
      OrderService,
      UserService,
      CartService,
      OrderItemService,
      MailService,
      ...orderProviders,
      ...userProviders,
      ...cartProviders,
      ...orderItemProviders
  ]
})
export class OrderModule {}
