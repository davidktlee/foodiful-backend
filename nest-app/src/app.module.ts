import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { AppController } from './app.controller';

@Module({
  imports: [UserModule, ProductModule, ReservationModule],
  controllers: [AppController],
})
export class AppModule {}
