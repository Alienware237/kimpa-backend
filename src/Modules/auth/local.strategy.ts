import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../../Services/auth/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(vorname: string, password: string): Promise<any>{
        const admin = await this.authService.validateUser(vorname, password);

        if (!admin) {
            throw new UnauthorizedException('Invalid admin credentials');
        }
        return admin;
    }
}