import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { OrderProduct } from '@prisma/client';

@Injectable()
export class OrderProductRepository {
  constructor(private prisma: PrismaService) {}
  create(createOrderProductDto: CreateOrderProductDto): Promise<OrderProduct> {
    return this.prisma.orderProduct.create({
      data: {
        ...createOrderProductDto,
      },
    });
  }
}
