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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
let ReviewService = class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async findAll() {
        return this.reviewRepository.findAll();
    }
    create(createReviewDto) {
        console.log('createReviewDto: ', createReviewDto);
        return this.reviewRepository.create(createReviewDto);
    }
    findOne(id) {
        return `This action returns a #${id} review`;
    }
    findAllByProductId(productId) {
        return this.reviewRepository.findAll({ where: { productId } });
    }
    update(id, updateReviewDto) {
        return `This action updates a #${id} review`;
    }
    remove(id) {
        return `This action removes a #${id} review`;
    }
};
ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.REVIEW_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ReviewService);
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map