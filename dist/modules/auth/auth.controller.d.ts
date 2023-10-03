import { AuthService } from "./auth.service";
import { AdministratorDto } from "../../Modules/Administrators/dto/administrator.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        admin: any;
        token: string;
    }>;
    signUp(admin: AdministratorDto): Promise<{
        admin: any;
        token: string;
    }>;
}
