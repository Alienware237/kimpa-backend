import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {OrderService} from "../../Services/order/order.service";
import {Order} from "../../Modells/order.entity";
import {CreateOrderDto} from "../../Modules/order/dto/create-order.dto";
import {UpdateOrderDto} from "../../Modules/order/dto/update-order.dto";
import {UserService} from "../../Services/user/user.service";
import {OrderDto} from "../../Modules/order/dto/order.dto";
import {OrderItemService} from "../../Services/order-item/order-item.service";


@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService,
                private readonly userService: UserService,
                private readonly orderItemService: OrderItemService
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
        const total = createOrderDto.data.totalAmount;
        console.log('createOrderDto.data.products: ', products);
        await this.userService.update(user.id, user);
        let orderItem = [];
        const order = await this.orderService.create({
            id: user.id,
            totalAmount: total
        }).then(async ord => {
            if (Array.isArray(products)) {
                console.log('New order: ', ord);
                let index = 0;
                products.forEach(product => {
                    orderItem[index] = this.orderItemService.create({
                        orderId: ord.dataValues.id,
                        productId: product.id,
                        quantity: product.detailsOfChoice.quantity,
                        unitPrice: product.price
                    })
                    ++index;
                })
            } else {
                orderItem[0] = await this.orderItemService.create({
                    orderId: ord.dataValues.id,
                    productId: products.id,
                    quantity: products.detailsOfChoice.quantity,
                    unitPrice: products.price
                })
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