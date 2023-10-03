import { ReviewService } from "../../Services/review/review.service";
import { UpdateReviewDto } from "../../Modules/review/dto/update-review.dto";
import { Review } from "../../Modells/review.entity";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getAllProduct(): Promise<Review[]>;
    create(createReviewDto: any): Promise<Review>;
    findAll(): Promise<Review[]>;
    findOne(productId: string): Promise<Review[]>;
    update(id: string, updateReviewDto: UpdateReviewDto): string;
    remove(id: string): string;
}
