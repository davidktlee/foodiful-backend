import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class ProductOnCartRepository {
  constructor(private prisma: PrismaService) {}
  createProductOnCart(createCartDto: CreateCartDto, cartId: number) {
    return this.prisma.productOnCart.create({
      data: {
        ...createCartDto,
        cartId,
      },
    });
  }
}
