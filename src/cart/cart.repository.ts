import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartRepository {
  constructor(private prisma: PrismaService) {}
  createCart(createCartDto: CreateCartDto, userId: number) {
    return this.prisma.cart.create({
      data: { ...createCartDto, userId },
    });
  }
  getCartByUserId(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });
  }
  getCartByProductId(productId: number) {
    return this.prisma.cart.findUnique({
      where: { productId },
    });
  }

  updateCart(cartId: number, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id: cartId },
      data: { ...updateCartDto },
    });
  }

  deleteCart(cartId: number) {
    return this.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }

  deleteCartItemByProductId(productId: number) {
    return this.prisma.cart.delete({
      where: {
        productId,
      },
    });
  }

  deleteAllProductOnCart(userId: number) {
    return this.prisma.cart.deleteMany({
      where: { userId },
    });
  }
}
