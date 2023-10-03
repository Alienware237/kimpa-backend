import { Review } from "../../Modells/review.entity";
import { CreateReviewDto } from "../../Modules/review/dto/create-review.dto";
import { UpdateReviewDto } from "../../Modules/review/dto/update-review.dto";
export declare class ReviewService {
    private reviewRepository;
    constructor(reviewRepository: typeof Review);
    findAll(): Promise<Review[]>;
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    findOne(id: number): string;
    findAllByProductId(productId: number): Promise<Review[]>;
    update(id: number, updateReviewDto: UpdateReviewDto): string;
    remove(id: number): string;
}
