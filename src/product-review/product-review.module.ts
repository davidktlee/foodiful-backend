import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { ProductReviewRepository } from './product-review.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductReviewController],
  providers: [ProductReviewService, ProductReviewRepository, PrismaService],
})
export class ProductReviewModule {}
