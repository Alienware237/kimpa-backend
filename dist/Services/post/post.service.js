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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
const administrator_entity_1 = require("../../Modells/administrator.entity");
let PostService = class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async create(post, adminId) {
        return await this.postRepository.create(Object.assign(Object.assign({}, post), { adminId }));
    }
    async findAll() {
        return await this.postRepository.findAll({
            include: [{ model: administrator_entity_1.Administrator, attributes: { exclude: ['password'] } }],
        });
    }
    async findOne(id) {
        return await this.postRepository.findOne({
            rejectOnEmpty: undefined,
            where: { id },
            include: [{ model: administrator_entity_1.Administrator, attributes: { exclude: ['password'] } }]
        });
    }
    async delete(id, adminId) {
        return await this.postRepository.destroy({ where: { id, adminId } });
    }
    async update(id, data, adminId) {
        const [numberOfAffectedRows, [updatedPost]] = await this.postRepository.update(Object.assign({}, data), { where: { id, adminId }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }
};
PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.POST_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map