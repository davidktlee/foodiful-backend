import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteLectureRepository } from 'src/favorite-lecture/favorite-lecture.repository';
import { LectureRepository } from './lecture.repository';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { AuthService } from 'src/auth/auth.service';
import { Lecture, LectureInquiry } from '@prisma/client';

@Injectable()
export class LectureService {
  constructor(
    private lectureRepository: LectureRepository,
    private favoriteLectureRepository: FavoriteLectureRepository,
    private authService: AuthService,
  ) {}

  async addLecture(createLectureDto: CreateLectureDto): Promise<Lecture> {
    const lecture = await this.getLectureByName(createLectureDto.name);
    if (lecture) throw new ConflictException('이미 존재하는 클래스입니다.');
    return this.lectureRepository.createLecture(createLectureDto);
  }

  async getAllLectures(token: string): Promise<Lecture[]> {
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

  async getLectureWithUserLiked(
    userId: number,
  ): Promise<(Lecture & { isLiked: boolean })[] | []> {
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

  getLectureById(id: number): Promise<Lecture> {
    return this.lectureRepository.getLectureById(id);
  }

  getLectureByName(name: string): Promise<Lecture> {
    return this.lectureRepository.getLectureByName(name);
  }

  async getLectureInquiry(id: number): Promise<LectureInquiry[]> {
    const lecture = await this.lectureRepository.getLectureInquiry(id);
    if (!lecture) throw new NotFoundException('찾으시는 클래스가 없습니다.');
    return lecture.inquiry;
  }

  update(id: number, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
    const existClass = this.lectureRepository.getLectureById(id);
    if (!existClass) throw new NotFoundException('찾으시는 클래스가 없습니다');
    return this.lectureRepository.updateLecture(id, updateLectureDto);
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
