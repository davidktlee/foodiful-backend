import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { CartRepository } from './cart.repository';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService, CartRepository],
})
export class CartModule {}
