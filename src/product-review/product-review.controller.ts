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
import { ProductReview } from '@prisma/client';

@Controller('product-review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  @UseGuards(JwtGuard)
  createProductReview(
    @Body() createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    return this.productReviewService.createProductReview(
      createProductReviewDto,
    );
  }

  @Get(':productId')
  getAllProductReviewsByProductId(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ProductReview[]> {
    return this.productReviewService.getAllProductReviewsByProductId(productId);
  }

  @Patch(':reviewId')
  @UseGuards(JwtGuard)
  updateProductReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    return this.productReviewService.updateProductReview(
      reviewId,
      updateProductReviewDto,
    );
  }

  @Delete(':reviewId')
  @UseGuards(JwtGuard)
  deleteProductReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<ProductReview> {
    return this.productReviewService.deleteProductReview(reviewId);
  }
}
