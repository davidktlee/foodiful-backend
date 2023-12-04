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

  @Get(':id')
  getAllProductReviewsByProductId(
    @Param('id', ParseIntPipe) productId: number,
  ) {
    return this.productReviewService.getAllProductReviewsByProductId(productId);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateProductReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.productReviewService.updateProductReview(
      id,
      updateProductReviewDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteProductReview(@Param('id', ParseIntPipe) id: number) {
    return this.productReviewService.deleteProductReview(id);
  }
}
