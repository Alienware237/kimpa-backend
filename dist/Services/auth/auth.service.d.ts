import { AdministratorService } from "../administrator/administrator.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
export declare class AuthService {
    private readonly adminService;
    private readonly userService;
    private readonly jwtService;
    constructor(adminService: AdministratorService, userService: UserService, jwtService: JwtService);
    validateUser(adminVorname: string, pass: string): Promise<any>;
    verifyToken(token: string): Promise<any>;
    login(admin: any): Promise<{
        admin: any;
        token: string;
    }>;
    loginAdmin(credentials: any): Promise<any>;
    createToken(payload: any): Promise<string>;
    create(admin: any): Promise<{
        admin: any;
        token: string;
    }>;
    private generateToken;
    private hashPassword;
    private comparePassword;
}
