import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/transform.interceptors';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { FavoriteProductModule } from './favorite-product/favorite-product.module';
import { CartModule } from './cart/cart.module';
import { RefundModule } from './refund/refund.module';
import { LectureModule } from './lecture/lecture.module';
import { FavoriteLectureModule } from './favorite-lecture/favorite-lecture.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    AuthModule,
    AwsModule,
    LectureModule,
    ReservationModule,
    OrderModule,
    OrderProductModule,
    ProductReviewModule,
    FavoriteProductModule,
    FavoriteLectureModule,
    CartModule,
    RefundModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
