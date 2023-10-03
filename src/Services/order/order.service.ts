import { Injectable, Inject } from "@nestjs/common";
import { OrderDto } from "../../Modules/order/dto/order.dto";
import {ORDER_REPOSITORY} from "../../core/constants";
import {Order} from "../../Modells/order.entity";
import {CreateOrderDto} from "../../Modules/order/dto/create-order.dto";
import {UpdateOrderDto} from "../../Modules/order/dto/update-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private orderRepository: typeof Order
    ) {
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.findAll<Order>();
    }

    create(createOrderData: any) {
        const newOrder = {
            userId: createOrderData.id,
            orderDate: new Date(),
            totalAmount: createOrderData.totalAmount
        }
        return this.orderRepository.create(newOrder);
    }

    findOne(id: number) {
        return `This action returns a #${id} order`;
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        return `This action updates a #${id} order`;
    }

    remove(id: number) {
        return `This action removes a #${id} order`;
    }
}