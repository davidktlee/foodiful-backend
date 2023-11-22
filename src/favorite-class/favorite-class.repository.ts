import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFavoriteClassDto } from './dto/create-favorite-class.dto';

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
  async getFavoriteClassByUserId(userId: number) {
    return this.prisma.favoriteClass.findMany({
      where: { userId },
      include: { class: true },
    });
  }

  async create(createFavoriteClassDto: CreateFavoriteClassDto) {
    return this.prisma.favoriteClass.create({
      data: {
        ...createFavoriteClassDto,
      },
    });
  }
}
