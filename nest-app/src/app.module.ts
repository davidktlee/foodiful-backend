import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
// import { UserRepository } from './user/user.repository';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  // providers: [UserRepository],
})
export class AppModule {}
