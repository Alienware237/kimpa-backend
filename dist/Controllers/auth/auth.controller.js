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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../Services/auth/auth.service");
const administrator_dto_1 = require("../../Modules/administrator/dto/administrator.dto");
const does_admin_exist_guard_service_1 = require("../../core/Guards/does-admin-exist-guard.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginAdmin(req) {
        console.log('credentials: ', req);
        return await this.authService.loginAdmin(req);
    }
    async signUp(admin) {
        return await this.authService.create(admin);
    }
    async loginUser(req) {
        return await this.authService.login(req.user);
    }
};
__decorate([
    (0, common_1.UseGuards)(does_admin_exist_guard_service_1.DoesAdminExistGuard),
    (0, common_1.Post)('admin/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginAdmin", null);
__decorate([
    (0, common_1.UseGuards)(does_admin_exist_guard_service_1.DoesAdminExistGuard),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [administrator_dto_1.AdministratorDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(does_admin_exist_guard_service_1.DoesAdminExistGuard),
    (0, common_1.Post)('user/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map