import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ProductController } from './product/product.controller';
import { ReservationController } from './reservation/reservation.controller';
import { UserService } from './user/user.service';
import { ReservationService } from './reservation/reservation.service';
import { ProductService } from './product/product.service';

@Module({
  imports: [],
  controllers: [UserController, ProductController, ReservationController],
  providers: [UserService, ReservationService, ProductService],
})
export class AppModule {}
