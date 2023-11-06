import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private prismaService: PrismaService) {}
  getOrderByUserId(id: number) {
    return this.prismaService.order.findMany({
      where: { userId: id },
      include: { orderProduct: true },
    });
  }
}
