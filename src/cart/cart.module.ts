import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { CartRepository } from './cart.repository';
// import { ProductOnCartRepository } from './productOnCart.repository';
// import { ProductOnCartService } from './productOnCart.service';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    // ProductOnCartService,
    PrismaService,
    CartRepository,
    // ProductOnCartRepository,
  ],
})
export class CartModule {}
