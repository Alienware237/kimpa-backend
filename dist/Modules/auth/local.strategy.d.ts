import { Strategy } from "passport-local";
import { AuthService } from "../../Services/auth/auth.service";
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(vorname: string, password: string): Promise<any>;
}
export {};
