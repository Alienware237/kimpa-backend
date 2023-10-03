import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "../../Services/user/user.service";
export declare class DoesAdminExistGuard implements CanActivate {
    private readonly userSevice;
    constructor(userSevice: UserService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateRequest(request: any): Promise<boolean>;
}
