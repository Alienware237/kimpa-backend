import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {UserService} from "../../Services/user/user.service";
import {AuthGuard} from "@nestjs/passport";
import {JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "../../Modules/auth/jwt.strategy";


@Injectable()
export class EnableToInsertArticleGuardService implements CanActivate {
    constructor(private readonly jwtService: JwtStrategy) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (!token || !token.startsWith('Bearer ')) {
            console.log('token ist not correct !!');
            return false;
        }

        const tokenValue = token.split(' ')[1];

        try {
            console.log('authorization: ', tokenValue);
            const decodedToken = this.jwtService.validate(tokenValue);
            request.user = decodedToken; // Attach the decoded token to the request object
            return true;
        } catch (error) {
            return false;
        }
    }

}