import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductReviewRepository {
  constructor(private prisma: PrismaService) {}
  async getAllProductReviews(id: number) {
    return this.prisma.productReview.findMany({
      where: { productId: id },
    });
  }
}
