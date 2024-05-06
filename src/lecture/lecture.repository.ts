import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LectureRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getAllLectures() {
    return this.prisma.lecture.findMany();
  }
  async getLectureById(id: number) {
    return this.prisma.lecture.findUnique({
      where: { id },
      include: { reservation: true },
    });
  }

  async getLectureByName(name: string) {
    return this.prisma.lecture.findUnique({
      where: { name },
    });
  }

  async createLecture(createLectureDto: CreateLectureDto) {
    return this.prisma.lecture.create({
      data: { ...createLectureDto },
    });
  }
  async updateLecture(id: number, updateLectureDto: UpdateLectureDto) {
    return this.prisma.lecture.update({
      where: { id },
      data: { ...updateLectureDto },
    });
  }
}
