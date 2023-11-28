import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Injectable()
export class ProductReviewRepository {
  constructor(private prisma: PrismaService) {}
  async getAllProductReviews(productId: number) {
    return this.prisma.productReview.findMany({
      where: { productId },
      include: { product: true, user: true },
    });
  }

  async getProductReviewById(id: number) {
    return this.prisma.productReview.findUnique({
      where: { id },
    });
  }

  async createProductReview(createProductReviewDto: CreateProductReviewDto) {
    return this.prisma.productReview.create({
      data: { ...createProductReviewDto },
    });
  }
  async updateProductReview(
    id: number,
    updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.prisma.productReview.update({
      where: { id },
      data: { ...updateProductReviewDto },
    });
  }
}
