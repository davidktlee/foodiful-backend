import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LectureRepository } from 'src/lecture/lecture.repository';
import { CreateFavoriteLectureDto } from './dto/create-favorite-lecture.dto';
import { UpdateFavoriteLectureDto } from './dto/update-favorite-lecture.dto';
import { FavoriteLectureRepository } from './favorite-lecture.repository';

@Injectable()
export class FavoriteLectureService {
  constructor(
    private favoriteLectureRepository: FavoriteLectureRepository,
    private lectureRepository: LectureRepository,
  ) {}
  create(createFavoriteLectureDto: CreateFavoriteLectureDto) {
    return this.favoriteLectureRepository.create(createFavoriteLectureDto);
  }

  async getFavoriteLectureByUserId(userId: number) {
    return this.favoriteLectureRepository.getFavoriteLectureByUserId(userId);
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteClass`;
  }
}
