import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteProductRepository {
  constructor(private prisma: PrismaService) {}

  async getProductsWithLike(userId: number) {
    return this.prisma.favoriteProduct.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async getLikedProductIds(userId: number) {
    return this.prisma.favoriteProduct
      .findMany({
        where: { userId },
        select: { productId: true },
      })
      .then((likes) => likes.map((like) => like.productId));
  }

  async getFavoriteProductByUserId(userId: number) {
    return this.prisma.favoriteProduct.findMany({
      where: { userId },
      include: { product: true },
    });
  }

  async create(userId: number, productId: number) {
    return this.prisma.favoriteProduct.create({
      data: {
        userId,
        productId,
      },
    });
  }
  async delete(userId: number, productId: number) {
    return this.prisma.favoriteProduct.deleteMany({
      where: { userId, productId },
    });
  }
}
