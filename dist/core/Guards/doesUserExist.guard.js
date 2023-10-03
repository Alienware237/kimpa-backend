"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoesUserExistGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../Services/user/user.service");
let DoesUserExistGuard = class DoesUserExistGuard {
    constructor(userSevice) {
        this.userSevice = userSevice;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(request) {
        const adminExist = await (this.userSevice.findOneByEmail(request.body.email) && this.userSevice.findOneByPassword(request.body.password));
        if (adminExist && (adminExist.role == 1)) {
            return true;
        }
        throw new common_1.ForbiddenException('This email already exist');
    }
};
DoesUserExistGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], DoesUserExistGuard);
exports.DoesUserExistGuard = DoesUserExistGuard;
//# sourceMappingURL=doesUserExist.guard.js.map