import { Strategy } from "passport-local";
import { AuthService } from "../../Services/auth/auth.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: any): Promise<any>;
}
export {};
