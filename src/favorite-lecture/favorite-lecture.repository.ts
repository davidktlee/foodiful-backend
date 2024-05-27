import { Injectable } from '@nestjs/common';
import { FavoriteLecture, Lecture, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoriteLectureRepository {
  constructor(private prisma: PrismaService) {}

  async getLectureWithLike(userId: number): Promise<
    (FavoriteLecture & {
      lecture: Lecture;
    })[]
  > {
    return this.prisma.favoriteLecture.findMany({
      where: { userId },
      include: { lecture: true },
    });
  }

  async getLikedLectureIds(userId: number): Promise<number[]> {
    return this.prisma.favoriteLecture
      .findMany({
        where: { userId },
        select: { lectureId: true },
      })
      .then((likes) => likes.map((like) => like.lectureId));
  }

  async getFavoriteLectureByUserId(userId: number): Promise<
    (FavoriteLecture & {
      lecture: Lecture;
    })[]
  > {
    return this.prisma.favoriteLecture.findMany({
      where: { userId },
      include: { lecture: true },
    });
  }

  async create(userId: number, lectureId: number): Promise<FavoriteLecture> {
    return this.prisma.favoriteLecture.create({
      data: {
        userId,
        lectureId,
      },
    });
  }
  remove(userId: number, lectureId: number): Promise<FavoriteLecture> {
    return this.prisma.favoriteLecture.delete({
      where: { userId, lectureId },
    });
  }
}
