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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const administrator_service_1 = require("../../Services/administrator.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(adminService, jwtService) {
        this.adminService = adminService;
        this.jwtService = jwtService;
    }
    async validateAdmin(AdminVorname, pass) {
        const admin = await this.adminService.findOneByVorname(AdminVorname);
        if (!admin) {
            return null;
        }
        const match = await this.comparePassword(pass, admin.password);
        if (!match) {
            return null;
        }
        const _a = admin['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
        return result;
    }
    async login(admin) {
        const token = await this.generateToken(admin);
        return { admin, token };
    }
    async create(admin) {
        const pass = await this.hashPassword(admin.password);
        const newAdmin = await this.adminService.create(Object.assign(Object.assign({}, admin), { password: pass }));
        const _a = newAdmin['dataValues'], { password } = _a, result = __rest(_a, ["password"]);
        const token = await this.generateToken(result);
        return { admin: result, token };
    }
    async generateToken(admin) {
        const token = await this.jwtService.signAsync(admin);
        return token;
    }
    async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [administrator_service_1.AdministratorService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map