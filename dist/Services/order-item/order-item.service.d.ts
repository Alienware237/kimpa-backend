import { UpdateOrderItemDto } from '../../Modules/order-item/dto/update-order-item.dto';
import { OrderItem } from "../../Modells/order_item.entity";
export declare class OrderItemService {
    private orderItemRepository;
    constructor(orderItemRepository: typeof OrderItem);
    create(createOrderItemDto: any): Promise<OrderItem>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): string;
    remove(id: number): string;
}
