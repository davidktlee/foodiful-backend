import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  create(
    orderForm: CreateOrderDto['orderForm'],
    userId: number,
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...orderForm,
        userId,
      },
    });
  }

  getOrderByUserId(userId: number): Promise<Order[]> {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderProduct: {
          include: { product: true },
        },
      },
    });
  }

  getOrderByOrderId(orderId: string): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
    });
  }

  cancelOrder(id: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { orderStatus: 'CANCEL' },
    });
  }
}
