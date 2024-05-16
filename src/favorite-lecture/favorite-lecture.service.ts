import { Injectable } from '@nestjs/common';
import { FavoriteLectureRepository } from './favorite-lecture.repository';

@Injectable()
export class FavoriteLectureService {
  constructor(private favoriteLectureRepository: FavoriteLectureRepository) {}
  create(userId: number, lectureId: number) {
    return this.favoriteLectureRepository.create(userId, lectureId);
  }

  async getFavoriteLectureByUserId(userId: number) {
    return this.favoriteLectureRepository.getFavoriteLectureByUserId(userId);
  }

  remove(userId: number, lectureId: number) {
    return this.favoriteLectureRepository.remove(userId, lectureId);
  }
}
