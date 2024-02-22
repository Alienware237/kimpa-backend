import { User } from "../../Modells/user.entity";
import { UserDto } from "../../Modules/user/dto/user.dto";
import { CartService } from "../cart/cart.service";
export declare class UserService {
    private userRepository;
    private cartService;
    constructor(userRepository: typeof User, cartService: CartService);
    findAll(): Promise<User[]>;
    findOne(id: number): string;
    update(id: number, updateUserDto: any): Promise<[affectedCount: number, affectedRows: User[]]>;
    remove(id: number): string;
    create(user: UserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneById(id: number): Promise<User>;
    findOneBylastName(lastName: string): Promise<User>;
    findOneByPassword(password: string): Promise<User>;
    find(email: string, password: string): Promise<User>;
    putLogInCookie(id: number, logInCookie: string): Promise<[affectedCount: number, affectedRows: User[]]>;
    findOneByCookie(cookies: string): Promise<User>;
}
