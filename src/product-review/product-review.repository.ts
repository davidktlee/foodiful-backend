import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';

@Injectable()
export class ProductReviewRepository {
  constructor(private prisma: PrismaService) {}
  async getAllProductReviews(id: number) {
    return this.prisma.productReview.findMany({
      where: { productId: id },
      include: { product: true },
    });
  }

  async create(createProductReviewDto: CreateProductReviewDto) {
    return this.prisma.productReview.create({
      data: { ...createProductReviewDto },
    });
  }
}
