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
exports.AdministratorService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
let AdministratorService = class AdministratorService {
    constructor(administratorRepository) {
        this.administratorRepository = administratorRepository;
    }
    findOne(id) {
        return `This action returns a #${id} administrator`;
    }
    update(id, updateAdministratorDto) {
        return `This action updates a #${id} administrator`;
    }
    remove(id) {
        return `This action removes a #${id} administrator`;
    }
    async findAll() {
        return this.administratorRepository.findAll();
    }
    async create(admin) {
        return await this.administratorRepository.create(admin);
    }
    async findOneByEmail(email) {
        return await this.administratorRepository.findOne({ rejectOnEmpty: undefined, where: { email } });
    }
    async findOneByRole(role) {
        return await this.administratorRepository.findOne({ rejectOnEmpty: undefined, where: { role } });
    }
    async findOneById(id) {
        return await this.administratorRepository.findOne({ rejectOnEmpty: undefined, where: { id } });
    }
    async findOneByVorname(lastName) {
        return await this.administratorRepository.findOne({ rejectOnEmpty: undefined, where: { lastName } });
    }
};
AdministratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ADMINISTRATOR_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], AdministratorService);
exports.AdministratorService = AdministratorService;
//# sourceMappingURL=administrator.service.js.map