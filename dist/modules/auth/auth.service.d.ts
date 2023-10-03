import { AdministratorService } from "../../Services/administrator.service";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly adminService;
    private readonly jwtService;
    constructor(adminService: AdministratorService, jwtService: JwtService);
    validateAdmin(AdminVorname: string, pass: string): Promise<any>;
    login(admin: any): Promise<{
        admin: any;
        token: string;
    }>;
    create(admin: any): Promise<{
        admin: any;
        token: string;
    }>;
    private generateToken;
    private hashPassword;
    private comparePassword;
}
