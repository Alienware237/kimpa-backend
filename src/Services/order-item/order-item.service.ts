import {Inject, Injectable} from '@nestjs/common';
import { CreateOrderItemDto } from '../../Modules/order-item/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../Modules/order-item/dto/update-order-item.dto';
import {ORDER_ITEM_REPOSITORY} from "../../core/constants";
import {OrderItem} from "../../Modells/order_item.entity";

@Injectable()
export class OrderItemService {

  constructor(@Inject(ORDER_ITEM_REPOSITORY)
              private orderItemRepository: typeof OrderItem
  ) {
  }
  async create(createOrderItemDto: any) {
    const newItemDto = {
      orderId: createOrderItemDto.orderId,
      productId: createOrderItemDto.productId,
      quantity: createOrderItemDto.quantity,
      unitPrice: createOrderItemDto.unitPrice
    }
    return await this.orderItemRepository.create(newItemDto);
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
