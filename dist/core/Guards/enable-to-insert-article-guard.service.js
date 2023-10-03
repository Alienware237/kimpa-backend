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
exports.EnableToInsertArticleGuardService = void 0;
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("../../Modules/auth/jwt.strategy");
let EnableToInsertArticleGuardService = class EnableToInsertArticleGuardService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    canActivate(context) {
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
            request.user = decodedToken;
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
EnableToInsertArticleGuardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_strategy_1.JwtStrategy])
], EnableToInsertArticleGuardService);
exports.EnableToInsertArticleGuardService = EnableToInsertArticleGuardService;
//# sourceMappingURL=enable-to-insert-article-guard.service.js.map