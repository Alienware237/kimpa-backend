import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtStrategy } from "../../Modules/auth/jwt.strategy";
export declare class EnableToInsertArticleGuardService implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtStrategy);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
