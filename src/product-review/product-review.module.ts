import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { ProductReviewRepository } from './product-review.repository';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from 'src/user/user.repository';
import { ProductRepository } from 'src/order-product/dto/product/product.repository';

@Module({
  controllers: [ProductReviewController],
  providers: [
    ProductReviewService,
    ProductReviewRepository,
    PrismaService,
    UserRepository,
    ProductRepository,
  ],
})
export class ProductReviewModule {}
