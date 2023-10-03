import { Module } from '@nestjs/common';
import { OrderItemService } from '../../Services/order-item/order-item.service';
import { OrderItemController } from '../../Controllers/order-item/order-item.controller';
import {orderItemProviders} from "../../Providers/order-item.providers";

@Module({
  controllers: [OrderItemController],
  providers: [
      OrderItemService,
      ...orderItemProviders
  ]
})
export class OrderItemModule {}
