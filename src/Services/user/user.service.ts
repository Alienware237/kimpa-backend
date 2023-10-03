import {Injectable, Inject, Module} from "@nestjs/common";
import {User} from "../../Modells/user.entity";
import {USER_REPOSITORY} from "../../core/constants";
import {CreateUserDto} from "../../Modules/user/dto/create-user.dto";
import {UpdateUserDto} from "../../Modules/user/dto/update-user.dto";
import {AdministratorDto} from "../../Modules/administrator/dto/administrator.dto";
import {Administrator} from "../../Modells/administrator.entity";
import {UserDto} from "../../Modules/user/dto/user.dto";
import {userProviders} from "../../Providers/user.provider";
import {response} from "express";
import {CartService} from "../cart/cart.service";
import {CartDto} from "../../Modules/cart/dto/cart.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject(USER_REPOSITORY)
        private userRepository: typeof User,
        private cartService: CartService
    ) {
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.findAll<User>();
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(userId: number, updateUserDto: any) {
        return this.userRepository.upsert(updateUserDto);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async create(user: UserDto): Promise<User> {
        console.log('This action adds a new user');
        const user_new = {
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            password: user.getPassword(),
            salutation: user.getSalutation(),
            street: user.getStreet(),
            houseNumber: user.getHouseNumber(),
            zipCode: user.getZipCode(),
            city: user.getCity(),
            country: user.getCountry(),
            phone: user.getPhone(),
            role: 2,
            cookies: user.getCookies()
        }
        const user_from_db = await this.userRepository.create(user_new);
        console.log('response: ', user_from_db.id);
        const cartDto = new CartDto();
        cartDto.setUserId(user_from_db.id);
        const cart = this.cartService.create(cartDto);
        // @ts-ignore
        return {'user': user_from_db, 'cart': cart};
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({rejectOnEmpty: undefined, where: { email }});
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findOne<User>({rejectOnEmpty: undefined, where: { id }});
    }

    async findOneBylastName(lastName: string): Promise<User> {
        return await this.userRepository.findOne<User>({rejectOnEmpty: undefined, where: {lastName}});
    }

    async findOneByPassword(password: string): Promise<User> {
        return await this.userRepository.findOne<User>({rejectOnEmpty: undefined, where: {password}});
    }

    async find(email: string, password: string): Promise<User> {
        return await this.userRepository.findOne<User>({rejectOnEmpty: undefined, where: {email, password}});
    }

    async putLogInCookie(id: number, logInCookie: string) {
        return this.userRepository.update<User>(
            {
                cookies: logInCookie
            },
            {
                returning: undefined,
                where : {id}
            }
        );
    }

    async findOneByCookie(cookies: string): Promise<User> {
        return await this.userRepository.findOne<User>({rejectOnEmpty: undefined, where: { cookies }});
    }

}