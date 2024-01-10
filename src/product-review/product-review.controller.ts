import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('product-review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  @UseGuards(JwtGuard)
  createProductReview(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.productReviewService.createProductReview(
      createProductReviewDto,
    );
  }

  @Get(':productId')
  getAllProductReviewsByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productReviewService.getAllProductReviewsByProductId(productId);
  }

  @Patch(':reviewId')
  @UseGuards(JwtGuard)
  updateProductReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.productReviewService.updateProductReview(
      reviewId,
      updateProductReviewDto,
    );
  }

  @Delete(':reviewId')
  @UseGuards(JwtGuard)
  deleteProductReview(@Param('reviewId', ParseIntPipe) reviewId: number) {
    return this.productReviewService.deleteProductReview(reviewId);
  }
}
