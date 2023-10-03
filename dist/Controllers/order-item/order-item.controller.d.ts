import { OrderItemService } from '../../Services/order-item/order-item.service';
import { CreateOrderItemDto } from '../../Modules/order-item/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../Modules/order-item/dto/update-order-item.dto';
export declare class OrderItemController {
    private readonly orderItemService;
    constructor(orderItemService: OrderItemService);
    create(createOrderItemDto: CreateOrderItemDto): Promise<import("../../Modells/order_item.entity").OrderItem>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: string): string;
}
