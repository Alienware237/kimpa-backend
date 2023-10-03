import { OrderService } from "../../Services/order/order.service";
import { Order } from "../../Modells/order.entity";
import { UpdateOrderDto } from "../../Modules/order/dto/update-order.dto";
import { UserService } from "../../Services/user/user.service";
import { OrderItemService } from "../../Services/order-item/order-item.service";
export declare class OrderController {
    private readonly orderService;
    private readonly userService;
    private readonly orderItemService;
    constructor(orderService: OrderService, userService: UserService, orderItemService: OrderItemService);
    getAllOrder(): Promise<Order[]>;
    create(createOrderDto: any): Promise<any[]>;
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
