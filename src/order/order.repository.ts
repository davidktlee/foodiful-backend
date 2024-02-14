import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  create(orderForm: CreateOrderDto['orderForm'], userId: number) {
    return this.prisma.order.create({
      data: {
        ...orderForm,
        userId,
      },
    });
  }

  getOrderByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        orderProduct: {
          include: { product: true },
        },
      },
    });
  }

  getOrderByOrderId(orderId: string) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
    });
  }

  cancelOrder(id: string) {
    return this.prisma.order.update({
      where: { id },
      data: { orderStatus: 'CANCEL' },
    });
  }
}
