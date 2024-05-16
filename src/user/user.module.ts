import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrderRepository } from 'src/order/order.repository';
import { PrismaService } from 'src/prisma.service';
import { ProductReviewRepository } from 'src/product-review/product-review.repository';
import { ProductReviewService } from 'src/product-review/product-review.service';
import { ProductRepository } from 'src/product/product.repository';
import { RefundRepository } from 'src/refund/refund.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { LectureRepository } from 'src/lecture/lecture.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    UserRepository,
    OrderRepository,
    ProductReviewService,
    ProductReviewRepository,
    ProductRepository,
    JwtService,
    RefundRepository,
    LectureRepository,
  ],
})
export class UserModule {}
