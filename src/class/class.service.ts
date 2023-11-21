import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteClassRepository } from 'src/favorite-class/favorite-class.repository';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(
    private classRepository: ClassRepository,
    private favoriteClassRepository: FavoriteClassRepository,
  ) {}
  create(createClassDto: CreateClassDto) {
    return this.classRepository.createClass(createClassDto);
  }

  getAllClasses() {
    return this.classRepository.getAllClasses();
  }

  async getClassesWithUserLiked(userId: number) {
    const classIdsWithLiked =
      await this.favoriteClassRepository.getLikedClassIds(userId);
    const classes = await this.classRepository.getAllClasses();

    const classWithLiked = classes.map((item) => {
      return {
        ...item,
        isLiked: classIdsWithLiked.includes(item.id),
      };
    });

    return classWithLiked;
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
