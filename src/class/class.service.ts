import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteClassRepository } from 'src/favorite-class/favorite-class.repository';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ClassService {
  constructor(
    private classRepository: ClassRepository,
    private favoriteClassRepository: FavoriteClassRepository,
    private authService: AuthService,
  ) {}
  create(createClassDto: CreateClassDto) {
    return this.classRepository.createClass(createClassDto);
  }

  async getAllClasses(token: string) {
    if (token) {
      const isVerified = await this.authService.validAccessToken(token);
      if (isVerified) {
        const { id } = this.authService.decodeJWTToken(token);
        return this.getClassesWithUserLiked(id);
      }
    } else {
      return this.classRepository.getAllClasses();
    }
  }

  async getClassesWithUserLiked(userId: number) {
    const classes = await this.classRepository.getAllClasses();
    if (!classes.length) return [];

    const classIdsWithLiked =
      await this.favoriteClassRepository.getLikedClassIds(userId);

    const classesWithLiked = classes.map((item) => {
      return {
        ...item,
        isLiked: classIdsWithLiked.includes(item.id),
      };
    });
    return classesWithLiked;
  }

  getClassById(id: number) {
    return this.classRepository.getClassById(id); // classRepository의 id로 찾은 값 반환
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    const existClass = this.classRepository.getClassById(id);
    if (!existClass) throw new NotFoundException('찾으시는 클래스가 없습니다');
    return this.classRepository.updateClass(id, updateClassDto);
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
