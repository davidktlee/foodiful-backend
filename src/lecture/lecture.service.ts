import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteLectureRepository } from 'src/favorite-lecture/favorite-lecture.repository';
import { LectureRepository } from './lecture.repository';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LectureService {
  constructor(
    private lectureRepository: LectureRepository,
    private favoriteLectureRepository: FavoriteLectureRepository,
    private authService: AuthService,
  ) {}
  addLecture(CreateLectureDto: CreateLectureDto) {
    // const lecture =
    return this.lectureRepository.createLecture(CreateLectureDto);
  }

  async getAllLectures(token: string) {
    if (token) {
      const isVerified = await this.authService.validAccessToken(token);
      if (isVerified) {
        const { id } = this.authService.decodeJWTToken(token);
        return this.getLectureWithUserLiked(id);
      }
    } else {
      return this.lectureRepository.getAllLectures();
    }
  }

  async getLectureWithUserLiked(userId: number) {
    const classes = await this.lectureRepository.getAllLectures();
    if (!classes.length) return [];

    const classIdsWithLiked =
      await this.favoriteLectureRepository.getLikedLectureIds(userId);

    const classesWithLiked = classes.map((item) => {
      return {
        ...item,
        isLiked: classIdsWithLiked.includes(item.id),
      };
    });
    return classesWithLiked;
  }

  getLectureById(id: number) {
    return this.lectureRepository.getLectureById(id);
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    const existClass = this.lectureRepository.getLectureById(id);
    if (!existClass) throw new NotFoundException('찾으시는 클래스가 없습니다');
    return this.lectureRepository.updateLecture(id, updateLectureDto);
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
