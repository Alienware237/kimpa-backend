import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {AdministratorService} from "../../Services/administrator/administrator.service";
import {Observable} from "rxjs";
import {UserService} from "../../Services/user/user.service";
import {AuthGuard} from "@nestjs/passport";


@Injectable()
export class DoesAdminExistGuard implements CanActivate {
    constructor(private readonly userSevice: UserService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        const adminExist = await (this.userSevice.findOneByEmail(request.body.email) && this.userSevice.findOneByPassword(request.body.password));
        if (adminExist && (adminExist.role == 1)) {
            return true;
        }
        throw new ForbiddenException('This admin not exist');
    }
}