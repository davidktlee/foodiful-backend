import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReview } from '@prisma/client';

@Injectable()
export class ProductReviewRepository {
  constructor(private prisma: PrismaService) {}
  getAllProductReviews(productId: number): Promise<ProductReview[]> {
    return this.prisma.productReview.findMany({
      where: { productId },
      include: { product: true, user: true },
    });
  }

  getProductReviewById(id: number): Promise<ProductReview> {
    return this.prisma.productReview.findUnique({
      where: { id },
    });
  }

  createProductReview(
    createProductReviewDto: CreateProductReviewDto,
  ): Promise<ProductReview> {
    return this.prisma.productReview.create({
      data: { ...createProductReviewDto },
    });
  }
  updateProductReview(
    id: number,
    updateProductReviewDto: UpdateProductReviewDto,
  ): Promise<ProductReview> {
    return this.prisma.productReview.update({
      where: { id },
      data: { ...updateProductReviewDto },
    });
  }

  deleteProductReview(id: number): Promise<ProductReview> {
    return this.prisma.productReview.delete({
      where: { id },
    });
  }
  getUserProductReviews(userId: number): Promise<ProductReview[]> {
    return this.prisma.productReview.findMany({
      where: { userId },
      include: { product: true },
    });
  }
}
