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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorController = void 0;
const common_1 = require("@nestjs/common");
const administrator_service_1 = require("../../Services/administrator/administrator.service");
const create_administrator_dto_1 = require("./dto/create-administrator.dto");
const update_administrator_dto_1 = require("./dto/update-administrator.dto");
let AdministratorController = class AdministratorController {
    constructor(administratorService) {
        this.administratorService = administratorService;
    }
    getAllAdmin() {
        return this.administratorService.findAll();
    }
    create(createAdministratorDto) {
        return this.administratorService.create(createAdministratorDto);
    }
    findOne(id) {
        return this.administratorService.findOne(+id);
    }
    update(id, updateAdministratorDto) {
        return this.administratorService.update(+id, updateAdministratorDto);
    }
    remove(id) {
        return this.administratorService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "getAllAdmin", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_administrator_dto_1.CreateAdministratorDto !== "undefined" && create_administrator_dto_1.CreateAdministratorDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], AdministratorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdministratorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_administrator_dto_1.UpdateAdministratorDto !== "undefined" && update_administrator_dto_1.UpdateAdministratorDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AdministratorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdministratorController.prototype, "remove", null);
AdministratorController = __decorate([
    (0, common_1.Controller)('administrator'),
    __metadata("design:paramtypes", [administrator_service_1.AdministratorService])
], AdministratorController);
exports.AdministratorController = AdministratorController;
//# sourceMappingURL=administrator.controller.js.map