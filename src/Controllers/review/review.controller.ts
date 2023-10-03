import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {ReviewService} from "../../Services/review/review.service";
import {CreateReviewDto} from "../../Modules/review/dto/create-review.dto";
import {UpdateReviewDto} from "../../Modules/review/dto/update-review.dto";
import {Review} from "../../Modells/review.entity";


@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {
    }

    @Get('list')
    getAllProduct(): Promise<Review[]> {
        return this.reviewService.findAll();
    }

    @Post('insert')
    create(@Body() createReviewDto: any) {
        return this.reviewService.create(createReviewDto.Review);
    }

    @Get()
    findAll() {
        return this.reviewService.findAll();
    }

    @Get('reviews-by-productId/:productId')
    findOne(@Param('productId') productId: string) {
        return this.reviewService.findAllByProductId(+productId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update(+id, updateReviewDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
}