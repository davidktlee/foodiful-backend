import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderProductDto } from './dto/create-order-product.dto';

@Injectable()
export class OrderProductRepository {
  constructor(private prisma: PrismaService) {}
  create(createOrderProductDto: CreateOrderProductDto) {
    return this.prisma.orderProduct.create({
      data: {
        ...createOrderProductDto,
      },
    });
  }
}
