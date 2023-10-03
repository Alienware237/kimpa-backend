import { AuthService } from "../../Services/auth/auth.service";
import { AdministratorDto } from "../../Modules/administrator/dto/administrator.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginAdmin(req: any): Promise<any>;
    signUp(admin: AdministratorDto): Promise<{
        admin: any;
        token: string;
    }>;
    loginUser(req: any): Promise<{
        admin: any;
        token: string;
    }>;
}
