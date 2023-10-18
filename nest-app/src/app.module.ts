import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { PrismaService } from './prisma.service';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductModule,
    AuthModule,
    AwsModule,
    ClassModule,
    ReservationModule,
  ],
  controllers: [AppController],
  // providers: [],
})
export class AppModule {}
