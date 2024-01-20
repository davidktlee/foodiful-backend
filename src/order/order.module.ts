import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { PrismaService } from 'src/prisma.service';
import { OrderProductService } from 'src/order-product/order-product.service';
import { OrderProductRepository } from 'src/order-product/order-product.repository';
import { CartService } from 'src/cart/cart.service';
import { CartRepository } from 'src/cart/cart.repository';
import { RefundService } from 'src/refund/refund.service';
import { RefundRepository } from 'src/refund/refund.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderProductService,
    OrderRepository,
    OrderProductRepository,
    PrismaService,
    CartService,
    CartRepository,
    RefundService,
    RefundRepository,
  ],
})
export class OrderModule {}
