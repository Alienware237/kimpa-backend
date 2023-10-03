import { Module } from '@nestjs/common';
import { ReviewService } from '../../Services/review/review.service';
import { ReviewController } from '../../Controllers/review/review.controller';
import {reviewProviders} from "../../Providers/review.providers";

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ...reviewProviders]
})
export class ReviewModule {}
