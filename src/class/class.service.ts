import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassService {
  constructor(private classRepository: ClassRepository) {}
  create(createClassDto: CreateClassDto) {
    return this.classRepository.createClass(createClassDto);
  }

  getAllClasses() {
    return this.classRepository.getAllClasses();
  }

  getClassesWithUserLiked(userId: number) {
    return;
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
