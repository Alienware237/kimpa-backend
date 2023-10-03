import {Injectable, Module, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AdministratorService} from "../../Services/administrator/administrator.service";
import { Strategy} from "passport-local";
import { ExtractJwt } from "passport-jwt";
import * as dotenv from 'dotenv'
import {AuthService} from "../../Services/auth/auth.service";
import {UserService} from "../../Services/user/user.service";


@Injectable()
@Module({
    imports: [ AuthService
    ]
})
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
                private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'Kimpa-shopping',
        });
    }
    async validate(payload: any) {
        //check if Administrator in the token actully exist
        const user = await this.authService.verifyToken(payload);
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return payload;
    }
}