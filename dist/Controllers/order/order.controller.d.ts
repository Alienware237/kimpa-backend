import { OrderService } from "../../Services/order/order.service";
import { Order } from "../../Modells/order.entity";
import { UpdateOrderDto } from "../../Modules/order/dto/update-order.dto";
import { UserService } from "../../Services/user/user.service";
import { OrderItemService } from "../../Services/order-item/order-item.service";
import { MailService } from "../../Services/mails/mail.service";
export declare class OrderController {
    private readonly orderService;
    private readonly userService;
    private readonly orderItemService;
    private readonly mailService;
    constructor(orderService: OrderService, userService: UserService, orderItemService: OrderItemService, mailService: MailService);
    getAllOrder(): Promise<Order[]>;
    create(createOrderDto: any): Promise<any[]>;
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): string;
    remove(id: string): string;
}
