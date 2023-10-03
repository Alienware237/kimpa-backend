import { AdministratorService } from "../../Services/administrator.service";
import { Strategy } from "passport-local";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly adminService;
    constructor(adminService: AdministratorService);
    validate(payload: any): Promise<any>;
}
export {};
