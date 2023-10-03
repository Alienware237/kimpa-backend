import { Order } from "../../Modells/order.entity";
import { UpdateOrderDto } from "../../Modules/order/dto/update-order.dto";
export declare class OrderService {
    private orderRepository;
    constructor(orderRepository: typeof Order);
    findAll(): Promise<Order[]>;
    create(createOrderData: any): Promise<Order>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
