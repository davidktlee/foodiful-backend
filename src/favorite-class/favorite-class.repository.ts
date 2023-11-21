import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteClassRepository {
  constructor(private prisma: PrismaService) {}
  async getClassWithLike(userId: number) {
    return this.prisma.favoriteClass.findMany({
      where: { userId },
      include: { class: true },
    });
  }
  async getLikedClassIds(userId: number) {
    return this.prisma.favoriteClass
      .findMany({
        where: { userId },
        select: { classId: true },
      })
      .then((likes) => likes.map((like) => like.classId));
  }
}
