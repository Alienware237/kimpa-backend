import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Patch,
    Post,
    Put
} from "@nestjs/common";
import {UserService} from "../../Services/user/user.service";
import {Product} from "../../Modells/product.entity";
import {CreateUserDto} from "../../Modules/user/dto/create-user.dto";
import {UpdateUserDto} from "../../Modules/user/dto/update-user.dto";
import {User} from "../../Modells/user.entity";
import {UserDto} from "../../Modules/user/dto/user.dto";
import {use} from "passport";
import {CartService} from "../../Services/cart/cart.service";
import {CartItem} from "../../Modells/cart_item.entity";
import {CartItemService} from "../../Services/cart-item/cart-item.service";
import {ProductService} from "../../Services/product/product.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly cartService: CartService,
                private readonly cartItemsService: CartItemService,
                private readonly productService: ProductService
) {
    }

    @Get('list')
    getAllUser(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Post('create')
    create(@Body() userDto: any) {
        try {
            const userData = JSON.parse(userDto.User);
            const userDto_new = new UserDto();
            if (userData.cookie) {
                userDto_new.setFirstName('');
                userDto_new.setLastName('');
                userDto_new.setEmail(userData.cookie+'@gmail.com');
                userDto_new.setPassword('');
                userDto_new.setSalutation(null);
                userDto_new.setStreet('');
                userDto_new.setHouseNumber(null);
                userDto_new.setZipCode('');
                userDto_new.setCity('');
                userDto_new.setCountry('');
                userDto_new.setPhone('');
                userDto_new.setRole(2);
                userDto_new.setCookies(userData.cookie)
            } else {
                userDto_new.setFirstName(userData.firstName);
                userDto_new.setLastName(userData.lastName);
                userDto_new.setEmail(userData.email);
                userDto_new.setPassword(userData.password);
                userDto_new.setSalutation(userData.salutation);
                userDto_new.setStreet(userData.street);
                userDto_new.setHouseNumber(userData.houseNumber);
                userDto_new.setZipCode(userData.zipCode);
                userDto_new.setCity(userData.city);
                userDto_new.setCountry(userData.country);
                userDto_new.setPhone(userData.phone);
                userDto_new.setRole(2);
                userDto_new.setCookies('')
            }

            console.log('HouseNumber: ', userDto.User)
            return this.userService.create(userDto_new);
        } catch (error) {
            console.error('Error creat user:', error);
            throw new InternalServerErrorException('Failed to creat user');
        }
    }

    @Get('/login/:email/:password/:logInCookie')
    async logIn(
        @Param('email') email: string,
        @Param('password') password: string,
        @Param('logInCookie') logInCookie: string
    ) {
        try {
            const user = (await this.userService.find(email, password)).dataValues;
            const cart = await this.cartService.findOne(user.id);
            const itemInCarts = await this.cartItemsService.findAll(cart.id);
            await this.userService.putLogInCookie(user.id, logInCookie);

            const listOfArticle = [];
            const dataItemInCart = [];

            console.log('itemInCarts: ', itemInCarts);
            for (const itemC of itemInCarts) {
                const searchResult = await this.productService.findById(itemC.dataValues.productId);
                listOfArticle.push(searchResult[0]);
            }

            console.log('listOfArticle: ', listOfArticle);

            for (const itemC of itemInCarts) {
                const article = listOfArticle.find(article => article.id === itemC.dataValues.productId);
                if (article) {
                    article['numberOfArticle'] = itemC.quantity;
                    article['detailsOfChoice'] = itemC.detailsOfChoice;
                    dataItemInCart.push(article);
                }
            }


            const data = {user, 'data': dataItemInCart};

            console.log('user by logIn: ', data);
            return data;
        } catch (error) {
            console.error('Error finding user and cart:', error);
            throw new InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }

    @Get('/cookie/:cookie')
    async getUserByCookie(
        @Param('cookie') cookie: string,
    ) {
        console.log('param1: ', cookie);
        try {
            let user = (await this.userService.findOneByCookie(cookie));
            user = user ? user.dataValues: null;
            console.log('/cookie/:cookie: ', user);
            const listOfArticle = [];
            const dataItemInCart = [];

            if (user){
                const cart = await this.cartService.findOne(user.id);
                const itemInCarts = await this.cartItemsService.findAll(cart.id);

                console.log('itemInCarts: ', itemInCarts);
                for (const itemC of itemInCarts) {
                    const searchResult = await this.productService.findById(itemC.dataValues.productId);
                    listOfArticle.push(searchResult[0]);
                }

                console.log('listOfArticle: ', listOfArticle);

                for (const itemC of itemInCarts) {
                    const article = listOfArticle.find(article => article.id === itemC.dataValues.productId);
                    if (article) {
                        article['numberOfArticle'] = itemC.quantity;
                        article['detailsOfChoice'] = itemC.detailsOfChoice;
                        dataItemInCart.push(article);
                    }
                }
            }

            const data = {user, 'data': dataItemInCart};
            console.log('user by getting cookie: ', data);
            return data;
        } catch (error) {
            console.error('Error finding user and cart by cookie:', error);
            throw new InternalServerErrorException('Failed to retrieve user and cart data');
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Put('update/:userId')
    updateUser(@Param('userId') userId: number,
               @Body() userDto: any
    ) {
        console.log('userDto: ', userDto);
        return this.userService.update(userId, userDto);
    }
}