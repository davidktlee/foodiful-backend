import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFavoriteLectureDto } from './dto/create-favorite-lecture.dto';

@Injectable()
export class FavoriteLectureRepository {
  constructor(private prisma: PrismaService) {}
  async getLectureWithLike(userId: number) {
    return this.prisma.favoriteLecture.findMany({
      where: { userId },
      include: { lecture: true },
    });
  }
  async getLikedLectureIds(userId: number) {
    return this.prisma.favoriteLecture
      .findMany({
        where: { userId },
        select: { lectureId: true },
      })
      .then((likes) => likes.map((like) => like.lectureId));
  }
  async getFavoriteLectureByUserId(userId: number) {
    return this.prisma.favoriteLecture.findMany({
      where: { userId },
      include: { lecture: true },
    });
  }

  async create(userId: number, lectureId: number) {
    return this.prisma.favoriteLecture.create({
      data: {
        userId,
        lectureId,
      },
    });
  }
  remove(userId: number, lectureId: number) {
    return this.prisma.favoriteLecture.delete({
      where: { userId, lectureId },
    });
  }
}
