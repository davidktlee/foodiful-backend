import { Injectable } from '@nestjs/common';
import { FavoriteLectureRepository } from './favorite-lecture.repository';

@Injectable()
export class FavoriteLectureService {
  constructor(private favoriteLectureRepository: FavoriteLectureRepository) {}
  create(userId: number, lectureId: number) {
    return this.favoriteLectureRepository.create(userId, lectureId);
  }

  async getFavoriteLectureByUserId(userId: number) {
    const favorite =
      await this.favoriteLectureRepository.getFavoriteLectureByUserId(userId);

    if (!!favorite.length) {
      return favorite.map((item) => ({
        ...item.lecture,
        isLiked: true,
      }));
    }
  }

  remove(userId: number, lectureId: number) {
    return this.favoriteLectureRepository.remove(userId, lectureId);
  }
}
