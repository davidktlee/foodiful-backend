import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Controller('product-review')
export class ProductReviewController {
  constructor(private readonly productReviewService: ProductReviewService) {}

  @Post()
  createProductReview(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.productReviewService.createProductReview(
      createProductReviewDto,
    );
  }

  @Get(':id')
  getAllProductReviewsByProductId(@Param('id', ParseIntPipe) id: number) {
    return this.productReviewService.getAllProductReviewsByProductId(id);
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.productReviewService.findOne(id);
  // }

  @Patch(':id')
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productReviewService.remove(id);
  }
}
