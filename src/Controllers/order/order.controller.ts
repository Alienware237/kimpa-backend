import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {OrderService} from "../../Services/order/order.service";
import {Order} from "../../Modells/order.entity";
import {CreateOrderDto} from "../../Modules/order/dto/create-order.dto";
import {UpdateOrderDto} from "../../Modules/order/dto/update-order.dto";
import {UserService} from "../../Services/user/user.service";
import {OrderDto} from "../../Modules/order/dto/order.dto";
import {OrderItemService} from "../../Services/order-item/order-item.service";
import {MailService} from "../../Services/mails/mail.service";


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService,
                private readonly userService: UserService,
                private readonly orderItemService: OrderItemService,
                private readonly mailService: MailService
                ) {
    }

    @Get('list')
    getAllOrder(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Post('create')
    async create(@Body() createOrderDto: any) {
        console.log('createOrderDto: ', createOrderDto)
        const products = createOrderDto.data.products;
        const user = createOrderDto.data.user;
        user.houseNumber = parseInt(user.houseNumber);
        user.role = parseInt(user.role);
        const total = createOrderDto.data.totalAmount;
        const orderText: string[] = []
        orderText.push("Hey " + user.firstName + "\n");
        orderText.push("Your order at Boutique Kimpa has been successfully processed. " +
            "You will receive in the next 4 days the articles in the following table: \n");

        // Add header row of articles Table
        orderText.push('| Name        | Quantity | Price  | Amount |');
        orderText.push('|-------------|----------|--------|--------|');

        console.log('createOrderDto.data.products: ', products);
        console.log('createUserDto.data.user: ', user);
        await this.userService.update(user.id, user);
        let orderItem = [];
        const order = await this.orderService.create({
            id: user.id,
            totalAmount: total
        }).then(async ord => {
            if (Array.isArray(products)) {
                console.log('New order: ', ord);
                let index = 0;
                for (const product of products) {
                    orderItem[index] = await this.orderItemService.create({
                        orderId: ord.dataValues.id,
                        productId: product.id,
                        quantity: product.detailsOfChoice.quantity,
                        unitPrice: product.price
                    })
                    const amount = product.detailsOfChoice.quantity * product.price;
                    orderText.push(`| ${product.name} | ${product.detailsOfChoice.quantity}        | ${product.price}€      | ${amount}€      |`);
                    ++index;
                }
                // Add total row of articles Table
                orderText.push('| Total                           |             |             | ' + (total<100 ? total + ' + 3€': total + '€') +'      |');
                orderText.push('\n' + 'We look forward to your next visit! \n')
                orderText.push('\n Best Regard \n Kimpa')

                await this.mailService.sendMailForCheckout(user.email, 'Your order at the Kimpa shop', orderText)
            } else {
                orderItem[0] = await this.orderItemService.create({
                    orderId: ord.dataValues.id,
                    productId: products.id,
                    quantity: products.detailsOfChoice.quantity,
                    unitPrice: products.price
                })
                const amount = products.detailsOfChoice.quantity * products.price;
                orderText.push(`| ${products.name} | ${products.detailsOfChoice.quantity}        | ${products.price}      | ${amount}      |`);
                // Add total row of articles Table
                orderText.push('| Total                         |             |             | ' + total + '€      |');
                orderText.push('\n' + 'We look forward to your next visit! \n')
                orderText.push('\n Best Regard \n Kimpa')
                await this.mailService.sendMailForCheckout(user.email, 'Your order at the Kimpa shop', orderText)
            }
        });

        return orderItem;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(+id);
    }
}