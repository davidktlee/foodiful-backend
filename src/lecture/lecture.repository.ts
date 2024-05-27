import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture, LectureInquiry } from '@prisma/client';

@Injectable()
export class LectureRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getAllLectures(): Promise<Lecture[]> {
    return this.prisma.lecture.findMany();
  }
  async getLectureById(id: number): Promise<Lecture> {
    return this.prisma.lecture.findUnique({
      where: { id },
      include: { reservation: true },
    });
  }

  async getLectureByName(name: string): Promise<Lecture> {
    return this.prisma.lecture.findUnique({
      where: { name },
    });
  }

  getLectureInquiry(
    id: number,
  ): Promise<Lecture & { inquiry: LectureInquiry[] }> {
    return this.prisma.lecture.findUnique({
      where: { id },
      include: { inquiry: true },
    });
  }

  async createLecture(createLectureDto: CreateLectureDto): Promise<Lecture> {
    return this.prisma.lecture.create({
      data: { ...createLectureDto },
    });
  }
  async updateLecture(
    id: number,
    updateLectureDto: UpdateLectureDto,
  ): Promise<Lecture> {
    return this.prisma.lecture.update({
      where: { id },
      data: { ...updateLectureDto },
    });
  }
}
