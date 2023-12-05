import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartRepository {
  constructor(private prisma: PrismaService) {}
  createCart(userId: number) {
    return this.prisma.cart.create({
      data: { userId },
    });
  }
  getCartByUserId(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { productOnCart: true },
    });
  }
}
