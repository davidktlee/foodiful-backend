import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { PrismaService } from 'src/prisma.service';
import { OrderProductRepository } from './order-product.repository';

@Module({
  controllers: [OrderProductController],
  providers: [OrderProductService, PrismaService, OrderProductRepository],
})
export class OrderProductModule {}
