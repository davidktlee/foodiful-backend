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
}
