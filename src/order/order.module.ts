import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaService } from 'src/prisma.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { OrderProductRepository } from 'src/order-product/order-product.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderProductService,
    OrderRepository,
    OrderProductRepository,
    PrismaService,
  ],
})
export class OrderModule {}
