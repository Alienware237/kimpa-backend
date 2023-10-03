import { Injectable, Inject } from "@nestjs/common";
import { ReviewDto } from "../../Modules/review/dto/review.dto";
import {REVIEW_REPOSITORY} from "../../core/constants";
import {Review} from "../../Modells/review.entity";
import {CreateReviewDto} from "../../Modules/review/dto/create-review.dto";
import {UpdateReviewDto} from "../../Modules/review/dto/update-review.dto";

@Injectable()
export class ReviewService {
    constructor(
        @Inject(REVIEW_REPOSITORY)
        private reviewRepository: typeof Review
    ) {
    }

    async findAll(): Promise<Review[]> {
        return this.reviewRepository.findAll<Review>();
    }

    create(createReviewDto: CreateReviewDto) {
        console.log('createReviewDto: ', createReviewDto);
        return this.reviewRepository.create(createReviewDto);
    }

    findOne(id: number) {
        return `This action returns a #${id} review`;
    }

    findAllByProductId(productId: number) {
        return this.reviewRepository.findAll<Review>({where: { productId }});
    }

    update(id: number, updateReviewDto: UpdateReviewDto) {
        return `This action updates a #${id} review`;
    }

    remove(id: number) {
        return `This action removes a #${id} review`;
    }
}